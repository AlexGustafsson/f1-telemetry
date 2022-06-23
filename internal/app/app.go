package app

import (
	"context"
	"net/http"

	"github.com/AlexGustafsson/f1-telemetry/internal/api"
	"github.com/AlexGustafsson/f1-telemetry/internal/server"
	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"go.uber.org/zap"
)

type App struct {
	timeSeries *timeseries.TimeSeries

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

	return &App{
		timeSeries: timeSeries,

		log: log,
	}, nil
}

func (a *App) Start(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Destroy() {
	a.timeSeries.Close()
}
