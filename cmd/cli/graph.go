package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
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

	timeSeries, err := timeseries.New(inputPath, log)
	if err != nil {
		log.Fatal("Failed to create time series for incoming packets", zap.Error(err))
	}

	querier, err := timeSeries.Storage.Querier(context.Background(), 0, 2000)
	if err != nil {
		log.Fatal("Failed to create time series querier", zap.Error(err))
	}

	matcher, err := labels.NewMatcher(labels.MatchEqual, labels.MetricName, timeseries.LabelSpeed)
	if err != nil {
		log.Fatal("Failed to create matcher", zap.Error(err))
	}

	matcher2, err := labels.NewMatcher(labels.MatchEqual, "self", "true")
	if err != nil {
		log.Fatal("Failed to create matcher", zap.Error(err))
	}
	set := querier.Select(false, nil, matcher, matcher2)

	encoder := json.NewEncoder(os.Stdout)
	encoder.SetIndent("", "  ")
	for set.Next() {
		series := set.At()
		labels := series.Labels()
		fmt.Println(labels)
		iterator := series.Iterator()
		for iterator.Next() {
			timestamp, value := iterator.At()
			fmt.Printf("%s,%s,%d,%f\n", labels.Get("session"), labels.Get("car"), timestamp, value)
		}
	}

	return nil
}
