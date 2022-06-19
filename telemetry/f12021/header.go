package f12021

type PacketHeader struct {
	PacketFormat            uint16
	GameMajorVersion        uint8
	GameMinorVersion        uint8
	PacketVersion           uint8
	PacketID                PacketID
	SessionUID              uint64
	SessionTime             float32
	FrameIdentifier         uint32
	PlayerCarIndex          uint8
	SecondaryPlayerCarIndex uint8
}
