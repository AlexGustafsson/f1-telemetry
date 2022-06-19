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

func (p PacketHeader) ID() uint32 {
	return p.FrameIdentifier
}

func (p PacketHeader) FormatVersion() uint16 {
	return p.PacketFormat
}

func (p PacketHeader) Type() uint8 {
	return uint8(p.PacketID)
}

func (p PacketHeader) Session() uint64 {
	return p.SessionUID
}
