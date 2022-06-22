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
	LabelSelf string = "self"

	LabelSpeed    string = "speed"
	LabelThrottle string = "throttle"
	LabelSteer    string = "steer"
	LabelBrake    string = "brake"
	LabelClutch   string = "clutch"
	LabelGear     string = "gear"
	LabelDRS      string = "drs"

	LabelCurrentLap     string = "lap"
	LabelCurrentLapTime string = "current_lap_time"
	LabelSector         string = "sector"
	LabelRacePosition   string = "race_position"
	LabelPitStatus      string = "pit_status"
	LabelPitStops       string = "pit_stops"
	LabelLapDistance    string = "lap_distance"

	LabelActualTyreCompound string = "actual_tyre_compound"
	LabelVisualTyreCompound string = "visual_tyre_compound"
	LabelTyreAge            string = "tyre_age"
)

type TimeSeries struct {
	Storage *tsdb.DB
	log     *zap.Logger

	// track per session
	tracks map[int]string
	// player names per session, per car
	playerNames map[int]map[int]string
}

func New(outputPath string, log *zap.Logger) (*TimeSeries, error) {
	// TODO: we can supply a registry here, use prometheus' helpers for gauges etc.?
	// How can we use it to efficiently push metrics?
	storage, err := tsdb.Open(outputPath, nil, nil, nil, nil)
	if err != nil {
		return nil, err
	}

	return &TimeSeries{
		Storage:     storage,
		log:         log,
		tracks:      make(map[int]string),
		playerNames: make(map[int]map[int]string),
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
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelThrottle, message.SessionTime, float64(telemetry.Throttle))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelSteer, message.SessionTime, float64(telemetry.Steer))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelBrake, message.SessionTime, float64(telemetry.Brake))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelClutch, message.SessionTime, float64(telemetry.Clutch))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelGear, message.SessionTime, float64(telemetry.Gear))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelDRS, message.SessionTime, convertBoolToFloat64(telemetry.DRS))
			}

			if err := appender.Commit(); err != nil {
				return err
			}
		case f12021.PacketIDLapData:
			message := packet.(*f12021.PacketLap)
			appender := t.Storage.Appender(context.Background())

			for car, telemetry := range message.LapData {
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelSector, message.SessionTime, float64(telemetry.Sector))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelCurrentLap, message.SessionTime, float64(telemetry.CurrentLapNumber))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelRacePosition, message.SessionTime, float64(telemetry.CarPosition))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelPitStatus, message.SessionTime, float64(telemetry.PitStatus))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelPitStops, message.SessionTime, float64(telemetry.PitStops))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelLapDistance, message.SessionTime, float64(telemetry.LapDistance))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelCurrentLapTime, message.SessionTime, float64(telemetry.CurrentLapTimeMilliseconds))
			}

			if err := appender.Commit(); err != nil {
				return err
			}
		case f12021.PacketIDCarStatus:
			message := packet.(*f12021.PacketCarStatus)
			appender := t.Storage.Appender(context.Background())

			for car, telemetry := range message.Cars {
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelActualTyreCompound, message.SessionTime, float64(telemetry.TyreActualCompound))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelVisualTyreCompound, message.SessionTime, float64(telemetry.TyreVisualCompound))
				t.add(appender, car, packet.Session(), car == int(message.PlayerCarIndex), LabelTyreAge, message.SessionTime, float64(telemetry.TyresAgeLaps))
			}

			if err := appender.Commit(); err != nil {
				return err
			}
		case f12021.PacketIDSession:
			message := packet.(*f12021.PacketSession)
			t.tracks[int(message.SessionUID)] = message.Track.String()
		case f12021.PacketIDParticipants:
			message := packet.(*f12021.PacketParticipants)
			names, ok := t.playerNames[int(message.SessionUID)]
			if !ok {
				names = make(map[int]string)
				t.playerNames[int(message.SessionUID)] = names
			}

			for car, participant := range message.Participants {
				names[car] = participant.Name
			}
		}
	default:
		return fmt.Errorf("unsupported format version")
	}

	return nil
}

func (t *TimeSeries) add(appender storage.Appender, car int, session uint64, self bool, name string, sampleTime float32, value float64) error {
	track, ok := t.tracks[int(session)]
	if !ok {
		track = "unknown"
	}

	playerName := "unknown"
	names, ok := t.playerNames[int(session)]
	if ok {
		n, ok := names[car]
		if ok {
			playerName = n
		}
	}

	labels := labels.FromMap(map[string]string{
		"session":         strconv.FormatUint(session, 10),
		"car":             strconv.FormatInt(int64(car), 10),
		"self":            strconv.FormatBool(self),
		"track":           track,
		"player":          playerName,
		labels.MetricName: name,
	})

	_, err := appender.Append(0, labels, int64(sampleTime*1000), value)
	return err
}
