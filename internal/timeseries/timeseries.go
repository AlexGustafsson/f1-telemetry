package timeseries

import (
	"context"
	"fmt"
	"strconv"

	"github.com/AlexGustafsson/f1-telemetry/telemetry"
	"github.com/AlexGustafsson/f1-telemetry/telemetry/f12021"
	"github.com/prometheus/prometheus/model/labels"
	"github.com/prometheus/prometheus/storage"
	"github.com/prometheus/prometheus/tsdb"
	"go.uber.org/zap"
)

const (
	LabelSpeed    string = "speed"
	LabelSteer    string = "steer"
	LabelThrottle string = "throttle"
	LabelBrake    string = "brake"
	LabelGear     string = "gear"
)

type TimeSeries struct {
	Storage *tsdb.DB
	log     *zap.Logger
}

func New(outputPath string, log *zap.Logger) (*TimeSeries, error) {
	// TODO: we can supply a registry here, use prometheus' helpers for gauges etc.?
	// How can we use it to efficiently push metrics?
	storage, err := tsdb.Open(outputPath, nil, nil, nil, nil)
	if err != nil {
		return nil, err
	}

	return &TimeSeries{
		Storage: storage,
		log:     log,
	}, nil
}

func (t *TimeSeries) Close() error {
	return t.Storage.Close()
}

func (t *TimeSeries) IngestContinously(packets chan telemetry.Packet) {
	for {
		packet, ok := <-packets
		if !ok {
			return
		}

		if err := t.Ingest(packet); err != nil {
			t.log.Error("Failed to ingest packet", zap.Uint16("formatVersion", packet.FormatVersion()), zap.Error(err))
		}
	}
}

func (t *TimeSeries) Ingest(packet telemetry.Packet) error {
	switch packet.FormatVersion() {
	case 2021:
		switch f12021.PacketID(packet.Type()) {
		case f12021.PacketIDCarTelemetry:
			message := packet.(*f12021.PacketCarTelemetry)
			appender := t.Storage.Appender(context.Background())

			for car, telemetry := range message.Telemetry {
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelSpeed, message.SessionTime, float64(telemetry.Speed))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelSteer, message.SessionTime, float64(telemetry.Steer))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelThrottle, message.SessionTime, float64(telemetry.Throttle))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelBrake, message.SessionTime, float64(telemetry.Brake))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelGear, message.SessionTime, float64(telemetry.Gear))

				t.log.Debug("Consumed telemetry", zap.Uint64("session", packet.Session()), zap.Int("car", car), zap.Uint32("timestamp", uint32(message.SessionTime)))
			}

			if err := appender.Commit(); err != nil {
				return err
			}
		}
	default:
		return fmt.Errorf("unsupported format version")
	}

	return nil
}

func (t *TimeSeries) add(appender storage.Appender, car int, session uint64, self bool, name string, sampleTime float32, value float64) error {
	labels := labels.FromMap(map[string]string{
		"session":         strconv.FormatUint(session, 10),
		"car":             strconv.FormatInt(int64(car), 10),
		"self":            strconv.FormatBool(self),
		labels.MetricName: name,
	})

	_, err := appender.Append(0, labels, int64(sampleTime*1000), value)
	return err
}
