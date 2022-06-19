package f12021

type PacketMotion struct {
	PacketHeader `nested:"true"`

	Cars [22]struct {
		WorldPositionX float32
		WorldPositionY float32
		WorldPositionZ float32

		WorldVelocityX float32
		WorldVelocityY float32
		WorldVelocityZ float32

		WorldForwardDirX int16
		WorldForwardDirY int16
		WorldForwardDirZ int16

		WorldRightDirX int16
		WorldRightDirY int16
		WorldRightDirZ int16

		GForceLateral      float32
		GForceLongitudinal float32
		GForceVertical     float32

		Yaw   float32
		Pitch float32
		Roll  float32
	}

	SuspensionPosition struct {
		RearLeft   float32
		RearRight  float32
		FrontLeft  float32
		FrontRight float32
	} `nested:"true"`

	SuspensionVelocity struct {
		RearLeft   float32
		RearRight  float32
		FrontLeft  float32
		FrontRight float32
	} `nested:"true"`

	SuspensionAcceleration struct {
		RearLeft   float32
		RearRight  float32
		FrontLeft  float32
		FrontRight float32
	} `nested:"true"`

	WheelSpeed struct {
		RearLeft   float32
		RearRight  float32
		FrontLeft  float32
		FrontRight float32
	} `nested:"true"`

	WheelSlip struct {
		RearLeft   float32
		RearRight  float32
		FrontLeft  float32
		FrontRight float32
	} `nested:"true"`

	LocalVelocityX float32
	LocalVelocityY float32
	LocalVelocityZ float32

	AngularVelocityX float32
	AngularVelocityY float32
	AngularVelocityZ float32

	AngularAccelerationX float32
	AngularAccelerationY float32
	AngularAccelerationZ float32

	FrontWheelsAngle float32
}
