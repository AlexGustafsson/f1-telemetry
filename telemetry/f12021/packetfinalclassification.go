package f12021

type PacketFinalClassification struct {
	PacketHeader `nested:"true"`

	Cars                 uint8
	FinalClassifications [22]struct {
		Position     uint8
		Laps         uint8
		GridPosition uint8
		Points       uint8
		PitStops     uint8
		ResultStatus ResultStatus

		BestLapTimeMilliseconds uint32
		TotalRaceTime           float32 // TODO: double in C#
		PenaltiesTime           uint8
		Penalties               uint8
		TyreStints              uint8
		UsedTyreCompounds       [8]TyreCompound
		UsedVisualTyreCompounds [8]VisualTyreCompound
	}
}
