package f12021

type PacketCarSetup struct {
	PacketHeader `nested:"true"`

	CarSetup [22]struct {
		FrontWing             uint8
		RearWing              uint8
		OnThrottle            uint8
		OffThrottle           uint8
		FrontCamber           float32
		RearCamber            float32
		FrontToe              float32
		RearToe               float32
		FrontSuspension       uint8
		RearSuspension        uint8
		FrontAntiRollBar      uint8
		RearAntiRollBar       uint8
		FrontSuspensionHeight uint8
		RearSuspensionHeight  uint8
		BrakePressure         uint8
		BrakeBias             uint8
		TyrePressure          struct {
			RearLeft   float32
			RearRight  float32
			FrontLeft  float32
			FrontRight float32
		} `nested:"true"`
		Ballast  uint8
		FuelLoad float32
	}
}
