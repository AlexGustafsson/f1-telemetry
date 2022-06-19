package f1struct

import (
	"encoding/hex"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type ExampleStruct struct {
	Bool    bool
	Uint8   uint8
	Int8    int8
	Uint16  uint16
	Int16   int16
	Float32 float32
	Uint32  uint32
	Uint64  uint64
	String  string `length:"4"`
	Struct  struct {
		Uint8 uint8
	} `nested:"true"`
	StructSlice []struct {
		Uint8 uint8
	}
	StructArray [2]struct {
		Uint8 uint8
	}
}

func TestRoundtrip(t *testing.T) {
	original := ExampleStruct{
		Bool:    true,
		Uint8:   0,
		Int8:    1,
		Uint16:  2,
		Int16:   3,
		Float32: 4.5,
		Uint32:  6,
		Uint64:  7,
		String:  "SSTA",
		Struct: struct{ Uint8 uint8 }{
			Uint8: 42,
		},
		StructSlice: []struct{ Uint8 uint8 }{
			{
				Uint8: 42,
			},
			{
				Uint8: 43,
			},
		},
		StructArray: [2]struct {
			Uint8 uint8
		}{
			{
				Uint8: 1,
			},
			{
				Uint8: 2,
			},
		},
	}

	marshaled, err := Marshal(&original)
	require.NoError(t, err)

	expectedMarshaled, err := hex.DecodeString("0100010200030000009040060000000700000000000000535354412a022a2b0102")
	require.NoError(t, err)
	assert.Equal(t, expectedMarshaled, marshaled)

	var unmarshaled ExampleStruct
	err = Unmarshal(marshaled, &unmarshaled)
	require.NoError(t, err)

	assert.Equal(t, original, unmarshaled)
}
