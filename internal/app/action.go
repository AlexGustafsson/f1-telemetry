package app

import (
	"github.com/AlexGustafsson/f1-telemetry/internal/util"
	"github.com/AlexGustafsson/f1-telemetry/internal/web"
	"github.com/urfave/cli/v2"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"go.uber.org/zap"
)

func ActionApp(ctx *cli.Context) error {
	log, err := util.GetLogger(ctx)
	if err != nil {
		return err
	}

	fs, err := web.FS()
	if err != nil {
		log.Fatal("Failed to get web resources", zap.Error(err))
	}

	app, err := NewApp(log)
	if err != nil {
		log.Fatal("Failed to initialize app", zap.Error(err))
	}
	defer app.destroy()

	// Create application with options
	err = wails.Run(&options.App{
		Title:     "F1 Telemetry",
		Width:     1024,
		Height:    768,
		Assets:    fs,
		OnStartup: app.start,
		Bind: []interface{}{
			app,
		},
	})
	if err != nil {
		log.Fatal("Failed to start application", zap.Error(err))
	}

	return nil
}
