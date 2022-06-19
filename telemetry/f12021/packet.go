package f12021

type Packet interface {
	Header() *PacketHeader
}

func (p PacketHeader) Header() *PacketHeader {
	return &p
}
