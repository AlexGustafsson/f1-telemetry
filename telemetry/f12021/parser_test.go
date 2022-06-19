package f12021

import (
	"encoding/hex"
	"testing"

	"github.com/AlexGustafsson/f1-telemetry/telemetry/f1struct"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestDecodeHeader(t *testing.T) {

	data, err := hex.DecodeString("e50701120103ecdef51ae1732c6db9613b440141000000ff")
	require.NoError(t, err)

	var actual PacketHeader
	err = f1struct.Unmarshal(data, &actual)
	require.NoError(t, err)

	expected := PacketHeader{
		PacketFormat:            2021,
		GameMajorVersion:        1,
		GameMinorVersion:        18,
		PacketVersion:           1,
		PacketID:                3,
		SessionUID:              0x6d2c73e11af5deec,
		SessionTime:             749.5269,
		FrameIdentifier:         16641,
		PlayerCarIndex:          0,
		SecondaryPlayerCarIndex: 255,
	}

	assert.EqualValues(t, expected, actual)
}

func TestDecodePacket(t *testing.T) {

	data, err := hex.DecodeString("e50701120103ecdef51ae1732c6db9613b440141000000ff4255544e8000000003000000")
	require.NoError(t, err)

	actual, err := ParsePacket(data)
	require.NoError(t, err)

	expected := &PacketEventButtonStatus{
		PacketEventHeader: PacketEventHeader{
			PacketHeader: PacketHeader{
				PacketFormat:            2021,
				GameMajorVersion:        1,
				GameMinorVersion:        18,
				PacketVersion:           1,
				PacketID:                3,
				SessionUID:              0x6d2c73e11af5deec,
				SessionTime:             749.5269,
				FrameIdentifier:         16641,
				PlayerCarIndex:          0,
				SecondaryPlayerCarIndex: 255,
			},
			Code: "BUTN",
		},
		ButtonStatus: 128,
		Padding:      [4]byte{3, 0, 0, 0},
	}

	assert.EqualValues(t, expected, actual)
}
