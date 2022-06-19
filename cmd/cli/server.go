package main

import (
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

	address := ctx.String("address")
	if address == "" {
		address = "0.0.0.0:20777"
	}

	outputPath := ctx.String("output")

	server, err := server.Listen(address)
	if err != nil {
		log.Fatal("Failed to listen for incoming packets", zap.Error(err))
	}
	defer server.Close()

	timeSeries, err := timeseries.New(outputPath, log)
	if err != nil {
		log.Fatal("Failed to create time series for incoming packets", zap.Error(err))
	}
	defer timeSeries.Close()

	packets := make(chan telemetry.Packet, 128)
	go timeSeries.IngestContinously(packets)

	for {
		message, ok := <-server.Messages()
		if !ok {
			break
		}

		// TODO: Data scripts don't seem to support messages > 1024B
		if len(message.Data) == 1024 {
			continue
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
