package main

import (
	"fmt"
	"time"

	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
	"github.com/prometheus/prometheus/model/timestamp"
	"github.com/prometheus/prometheus/promql"
	"github.com/prometheus/prometheus/promql/parser"
	"github.com/urfave/cli/v2"
	"go.uber.org/zap"
)

func ActionQuery(ctx *cli.Context) error {
	log, err := configureLogging(ctx)
	if err != nil {
		return err
	}

	inputPath := ctx.String("input")

	timeSeries, err := timeseries.New(inputPath, log)
	if err != nil {
		log.Fatal("Failed to create time series for incoming packets", zap.Error(err))
	}

	queryString := ctx.String("query")
	start := timestamp.Time(ctx.Int64("from"))
	end := timestamp.Time(ctx.Int64("to"))
	interval := ctx.Duration("interval")
	if interval == 0 {
		interval = 1 * time.Millisecond
	}
	samples := ctx.Int("samples")
	if samples == 0 {
		samples = 1000
	}

	engine := promql.NewEngine(promql.EngineOpts{Timeout: 30 * time.Second, MaxSamples: samples})

	query, err := engine.NewRangeQuery(timeSeries.Storage, nil, queryString, start, end, interval)
	if err != nil {
		log.Fatal("Failed to parse query", zap.Error(err))
	}
	defer query.Close()

	result := query.Exec(ctx.Context)
	if result.Err != nil {
		log.Fatal("Failed to perform query", zap.Error(result.Err))
	}

	headerPrinted := false
	var m map[string]string

	switch result.Value.Type() {
	case parser.ValueTypeScalar:
		fmt.Println(result.Value.String())
	case parser.ValueTypeMatrix:
		matrix := result.Value.(promql.Matrix)
		for _, series := range matrix {
			m2 := series.Metric.Map()
			if !headerPrinted {
				m = series.Metric.Map()
				fmt.Printf("timestamp,")
				for k := range m {
					fmt.Printf("%s,", k)
				}
				fmt.Println("value")
				headerPrinted = true
			}
			for _, p := range series.Points {
				fmt.Printf("%d,", p.T)
				for k := range m {
					fmt.Printf("%s,", m2[k])
				}
				fmt.Printf("%v\n", p.V)
			}
		}
	default:
		log.Fatal("Unsupported result type", zap.String("type", string(result.Value.Type())))
	}

	// encoder := json.NewEncoder(os.Stdout)
	// encoder.SetIndent("", "  ")
	// for set.Next() {
	// 	series := set.At()
	// 	labels := series.Labels()
	// 	fmt.Println(labels)
	// 	iterator := series.Iterator()
	// 	for iterator.Next() {
	// 		timestamp, value := iterator.At()
	// 		fmt.Printf("%s,%s,%d,%f\n", labels.Get("session"), labels.Get("car"), timestamp, value)
	// 	}
	// }

	return nil
}
