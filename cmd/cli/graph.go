package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"github.com/prometheus/prometheus/model/labels"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

func ActionGraph(ctx *cli.Context) error {
	log, err := configureLogging(ctx)
	if err != nil {
		return err
	}

	inputPath := ctx.String("input")

	timeSeries, err := telemetry.NewTimeSeries(inputPath, log)
	if err != nil {
		log.Fatal("Failed to create time series for incoming packets", zap.Error(err))
	}

	querier, err := timeSeries.Storage.Querier(context.Background(), 0, 1000)
	if err != nil {
		log.Fatal("Failed to create time series querier", zap.Error(err))
	}

	matcher1, err := labels.NewMatcher(labels.MatchEqual, "metric", "speed")
	if err != nil {
		log.Fatal("Failed to create matcher", zap.Error(err))
	}
	matcher2, err := labels.NewMatcher(labels.MatchEqual, "car", "0")
	if err != nil {
		log.Fatal("Failed to create matcher", zap.Error(err))
	}
	set := querier.Select(false, nil, matcher1, matcher2)

	encoder := json.NewEncoder(os.Stdout)
	encoder.SetIndent("", "  ")
	for set.Next() {
		series := set.At()
		labels := series.Labels()
		iterator := series.Iterator()
		for iterator.Next() {
			timestamp, value := iterator.At()
			fmt.Println(timestamp, value, labels)
		}
	}

	return nil
}
