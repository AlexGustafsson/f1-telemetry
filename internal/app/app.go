package app

import (
	"context"
	"encoding/json"
	"net/http"
	"os"

	"github.com/AlexGustafsson/f1-telemetry/internal/api"
	"github.com/AlexGustafsson/f1-telemetry/internal/server"
	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"go.uber.org/zap"
)

type App struct {
	timeSeries *timeseries.TimeSeries

	localStorage        map[string]string
	localStorageUpdates chan struct{}

	ctx context.Context
	log *zap.Logger
}

func NewApp(log *zap.Logger) (*App, error) {
	timeSeries, err := timeseries.New("database", log)
	if err != nil {
		return nil, err
	}

	packets := make(chan telemetry.Packet, 128)
	go timeSeries.IngestContinously(packets)

	telemetryServer := server.New()
	go func() {
		log.Info("Telemetry server starting", zap.String("address", "udp:0.0.0.0:20777"))
		if err := telemetryServer.ListenAndServe("0.0.0.0:20777"); err != nil {
			log.Fatal("Failed to listen for incoming telemetry packets", zap.Error(err))
		}
	}()

	go func() {
		for {
			message, ok := <-telemetryServer.Messages()
			if !ok {
				break
			}

			// Probably fast enough to do on the "message thread"
			packet, err := telemetry.ParsePacket(message.Data)
			if err != nil {
				log.Error("Failed to parse packet", zap.Error(err))
				continue
			}

			packets <- packet
		}
	}()

	go func() {
		apiServer := api.NewServer(timeSeries)

		mux := http.NewServeMux()
		mux.Handle("/api/v1/", apiServer)

		go func() {
			log.Info("API server starting", zap.String("address", "tcp:127.0.0.1:20777"))
			if err := http.ListenAndServe("127.0.0.1:20777", mux); err != nil {
				log.Fatal("Failed to listen for incoming API requests", zap.Error(err))
			}
		}()
	}()

	localStorage := make(map[string]string)
	// Try to read the local storage file
	localStorageFile, err := os.ReadFile("f1-telemetry.json")
	if err == nil {
		if err := json.Unmarshal(localStorageFile, &localStorage); err != nil {
			log.Fatal("Failed to read f1-telemetry.json - invalid contents", zap.Error(err))
		}
	}

	localStorageUpdates := make(chan struct{})

	go func() {
		for {
			_, ok := <-localStorageUpdates
			if !ok {
				return
			}

			file, err := os.OpenFile("f1-telemetry.json", os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0644)
			if err != nil {
				log.Error("Failed to open local storage for writing", zap.Error(err))
				continue
			}

			encoder := json.NewEncoder(file)
			encoder.SetIndent("", "  ")
			encoder.Encode(localStorage)

			file.Close()
		}
	}()

	return &App{
		timeSeries: timeSeries,

		localStorage:        localStorage,
		localStorageUpdates: localStorageUpdates,

		log: log,
	}, nil
}

func (a *App) start(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) destroy() {
	a.timeSeries.Close()
	close(a.localStorageUpdates)
}

func (a *App) GetItem(name string) *string {
	value, ok := a.localStorage[name]
	if !ok {
		return nil
	}
	return &value
}

func (a *App) SetItem(name string, value string) {
	a.localStorage[name] = value
	a.localStorageUpdates <- struct{}{}
}

func (a *App) RemoveItem(name string) {
	delete(a.localStorage, name)
	a.localStorageUpdates <- struct{}{}
}
