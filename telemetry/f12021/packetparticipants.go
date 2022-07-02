package f12021

type PacketParticipants struct {
	PacketHeader `nested:"true"`
	ActiveCars   uint8
	Participants [22]struct {
		IsAIControlled bool
		Driver         Driver
		NetworkID      uint8
		Team           Team
		IsMyTeam       bool
		RaceNumber     uint8
		Nationality    Nationality
		Name           string `length:"48"`
		// YourTelemetryActivated bool // TODO: Seems to be 0xec instead of 0x01 when on...
		YourTelemetryActivated uint8
	}
}
