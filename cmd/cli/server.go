package main

import (
	"net/http"

	"github.com/AlexGustafsson/f1-telemetry/internal/api"
	"github.com/AlexGustafsson/f1-telemetry/internal/server"
	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

func ActionServer(ctx *cli.Context) error {
	log, err := configureLogging(ctx)
	if err != nil {
		return err
	}

	telemetryAddress := ctx.String("telemetry-address")
	if telemetryAddress == "" {
		telemetryAddress = "0.0.0.0:20777"
	}

	apiAddress := ctx.String("api-address")
	if apiAddress == "" {
		apiAddress = "0.0.0.0:8080"
	}

	outputPath := ctx.String("output")

	timeSeries, err := timeseries.New(outputPath, log)
	if err != nil {
		log.Fatal("Failed to create time series for incoming packets", zap.Error(err))
	}
	defer timeSeries.Close()

	log.Info("Telemetry server starting", zap.String("address", telemetryAddress))
	telemetryServer, err := server.Listen(telemetryAddress)
	if err != nil {
		log.Fatal("Failed to listen for incoming telemetry packets", zap.Error(err))
	}
	defer telemetryServer.Close()

	api := api.New(timeSeries)
	apiServer := http.Server{Addr: apiAddress, Handler: api}

	packets := make(chan telemetry.Packet, 128)
	go timeSeries.IngestContinously(packets)

	go func() {
		log.Info("API server starting", zap.String("address", apiAddress))
		if err := apiServer.ListenAndServe(); err != nil {
			log.Fatal("Failed to listen for incoming API requets", zap.Error(err))
		}
	}()

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

	return nil
}
