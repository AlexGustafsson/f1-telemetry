package f12021

type LapStatus uint8

// TODO: Document that these are flags; LapStatus & LapStatusValid
const (
	LapStatusValid LapStatus = 1 << iota
	LapStatusSector1Valid
	LapStatusSector2Valid
	LapStatusSector3Valid
)

type PacketSessionHistory struct {
	PacketHeader `nested:"true"`

	CardIndex  uint8
	Laps       uint8
	TyreStints uint8

	BestLap        uint8
	BestSector1Lap uint8
	BestSector2Lap uint8
	BestSector3Lap uint8

	LapHistory [100]struct {
		LapTimeMilliseconds     uint32
		Sector1TimeMilliseconds uint16
		Sector2TimeMilliseconds uint16
		Sector3TimeMilliseconds uint16
		LapStatus               LapStatus
	}

	TyreStintsHistory [8]struct {
		EndLap             uint8
		TyreActualCompound TyreCompound
		TyreVisualCompound VisualTyreCompound
	}
}
