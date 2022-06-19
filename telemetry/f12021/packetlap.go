package f12021

type PitStatus uint8

const (
	PitStatusNone PitStatus = iota
	PitStatusPitting
	PitStatusInPitArea
)

type DriverStatus uint8

const (
	DriverStatusIngarage DriverStatus = iota
	DriverStatusFlyingLap
	DriverStatusInLap
	DriverStatusOutLap
	DriverStatusOnTrack
)

type ResultStatus uint8

const (
	ResultStatusInvalid ResultStatus = iota
	ResultStatusInactive
	ResultStatusActive
	ResultStatusFinished
	ResultStatusDidNotFinish
	ResultStatusDisqualified
	ResultStatusNotClassified
	ResultStatusRetired
)

type PacketLap struct {
	PacketHeader `nested:"true"`

	LapData [22]struct {
		LastLapTimeMilliseconds       uint32
		CurrentLapTimeMilliseconds    uint32
		Sector1TimeMilliseconds       uint16
		Sector2TimeMilliseconds       uint16
		LapDistance                   float32
		TotalDistance                 float32
		SafetyCarDelta                float32
		CarPosition                   uint8
		CurrentLapNumber              uint8
		PitStatus                     PitStatus
		PitStops                      uint8
		Sector                        uint8
		CurrentLapInvalid             bool
		Penalties                     uint8
		Warnings                      uint8
		UnservedDriveThroughPenalties uint8
		UnservedStopAndGoPenalties    uint8
		GridPosition                  uint8
		DriverStatus                  DriverStatus
		ResultStatus                  ResultStatus
		PitLaneTimerActive            bool
		PitLaneTimeInLaneMilliseconds uint16
		PitStopTimerMilliseconds      uint16
		PitStopShouldServePenalty     uint8
	}
}
