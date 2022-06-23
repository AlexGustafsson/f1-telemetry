package app

import (
	"context"
	"fmt"
	"net/http"

	"github.com/AlexGustafsson/f1-telemetry/internal/api"
	"github.com/AlexGustafsson/f1-telemetry/internal/server"
	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
	"github.com/AlexGustafsson/f1-telemetry/internal/util"
	"github.com/AlexGustafsson/f1-telemetry/internal/web"
	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"github.com/urfave/cli/v2"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"go.uber.org/zap"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func ActionApp(ctx *cli.Context) error {
	log, err := util.GetLogger(ctx)
	if err != nil {
		return err
	}

	fs, err := web.FS()
	if err != nil {
		log.Fatal("Failed to get web resources", zap.Error(err))
	}

	timeSeries, err := timeseries.New("database", log)
	if err != nil {
		log.Fatal("Failed to create time series for incoming packets", zap.Error(err))
	}
	defer timeSeries.Close()

	log.Info("Telemetry server starting", zap.String("address", "0.0.0.0:20777"))
	telemetryServer := server.New()

	apiServer := api.NewServer(timeSeries)

	mux := http.NewServeMux()
	mux.Handle("/api/v1/", apiServer)

	packets := make(chan telemetry.Packet, 128)
	go timeSeries.IngestContinously(packets)

	go func() {
		log.Info("API server starting", zap.String("address", "127.0.0.1:20777"))
		if err := http.ListenAndServe("127.0.0.1:20777", mux); err != nil {
			log.Fatal("Failed to start HTTP server", zap.Error(err))
		}
	}()

	go func() {
		log.Info("Telemetry server starting", zap.String("address", "127.0.0.1:20777"))
		if err := telemetryServer.ListenAndServe("127.0.0.1:20777"); err != nil {
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

	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err = wails.Run(&options.App{
		Title:     "F1 Telemetry",
		Width:     1024,
		Height:    768,
		Assets:    fs,
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
	})
	if err != nil {
		log.Fatal("Failed to start application", zap.Error(err))
	}

	return nil
}
