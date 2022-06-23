package app

import (
	"context"
	"fmt"

	"github.com/AlexGustafsson/f1-telemetry/internal/util"
	"github.com/AlexGustafsson/f1-telemetry/internal/web"
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

	// webServer, err := web.NewServer()
	// if err != nil {
	// 	log.Fatal("Failed to create web server", zap.Error(err))
	// }

	// timeSeries, err := timeseries.New("database", log)
	// if err != nil {
	// 	log.Fatal("Failed to create time series for incoming packets", zap.Error(err))
	// }
	// defer timeSeries.Close()

	// apiServer := api.NewServer(timeSeries)

	// mux := http.NewServeMux()
	// mux.Handle("/api/v1", apiServer)
	// mux.Handle("/", webServer)

	// window := webview.New(false)
	// defer window.Destroy()

	// window.SetTitle("F1 Telemetry")
	// window.SetSize(1024, 720, webview.HintNone)
	// window.SetHtml(html)

	// go func() {
	// 	if err := http.ListenAndServe("127.0.0.1:8080", mux); err != nil {
	// 		log.Fatal("Failed to start HTTP server", zap.Error(err))
	// 	}
	// }()

	// Create an instance of the app structure
	app := NewApp()

	fs, err := web.FS()
	if err != nil {
		log.Fatal("Failed to get web resources", zap.Error(err))
	}

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
