package telemetry

type Packet interface {
	// ID is a unique id of the packet.
	ID() uint32
	// FormatVersion is the format of the packet, typically the year the game was released.
	FormatVersion() uint16
	// Type returns the packet type.
	Type() uint8
	// Session returns a unique id for the session.
	Session() uint64
}
