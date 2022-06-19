package telemetry

import (
	"encoding/binary"
	"fmt"

	"github.com/AlexGustafsson/f1-telemetry/telemetry/f12021"
)

var parsers = map[uint16]func([]byte) (any, error){
	2021: f12021.ParsePacket,
}

func ParsePacket(data []byte) (Packet, error) {
	packetFormat := binary.LittleEndian.Uint16(data)

	parse, ok := parsers[packetFormat]
	if !ok {
		return nil, fmt.Errorf("unsupported packet format: %d", packetFormat)
	}

	packet, err := parse(data)
	if err != nil {
		return nil, err
	}

	return packet.(Packet), nil
}
