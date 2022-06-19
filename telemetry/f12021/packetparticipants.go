package f12021

type PacketParticipants struct {
	PacketHeader `nested:"true"`
	ActiveCars   uint8
	Participants [22]struct {
		IsAIControlled uint8 // TODO: Bool not working?
		Driver         Driver
		NetworkID      uint8
		Team           Team
		IsMyTeam       bool // TODO: Bool not working?
		RaceNumber     uint8
		Nationality    Nationality
		Name           string `length:"48"`
		// YourTelemetryActivated bool // TODO: Seems to be 0xec instead of 0x01 when on...
		YourTelemetryActivated uint8
	}
}
