package main

import (
	"encoding/binary"
	"io"
	"io/ioutil"
	"os"
	"time"

	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

func ActionDatabaseIngest(ctx *cli.Context) error {
	log, err := configureLogging(ctx)
	if err != nil {
		return err
	}

	address := ctx.String("address")
	if address == "" {
		address = "0.0.0.0:20777"
	}

	interval := ctx.Duration("interval")
	if interval == 0 {
		interval = 200 * time.Millisecond
	}

	inputPath := ctx.String("input")
	data, err := os.Open(inputPath)
	if err != nil {
		log.Fatal("Failed to open input", zap.Error(err))
	}
	defer data.Close()

	outputPath := ctx.String("output")
	timeSeries, err := timeseries.New(outputPath, log)
	if err != nil {
		log.Fatal("Failed to open time series", zap.Error(err))
	}
	defer data.Close()

	ingested := 0
	for {
		var length uint32
		if err := binary.Read(data, binary.LittleEndian, &length); err != nil {
			if err == io.EOF {
				break
			}
			log.Fatal("Failed to read message from input", zap.Error(err))
		}
		if length == 0 {
			continue
		}

		buffer, err := ioutil.ReadAll(io.LimitReader(data, int64(length)))
		if err != nil {
			log.Fatal("Failed to read message from input", zap.Error(err))
		}

		packet, err := telemetry.ParsePacket(buffer[:length])
		if err != nil {
			log.Error("Failed to parse packet", zap.Error(err))
			continue
		}

		if err := timeSeries.Ingest(packet); err != nil {
			log.Error("Failed to ingest packet", zap.Error(err))
			continue
		}
		ingested++
	}

	log.Info("Successfully ingested packets", zap.Int("ingested", ingested))

	return nil
}
