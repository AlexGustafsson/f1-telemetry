package f12021

type PacketCarDamage struct {
	PacketHeader `nested:"true"`

	CarDamage [22]struct {
		TyresWear struct {
			RearLeft   float32
			RearRight  float32
			FrontLeft  float32
			FrontRight float32
		} `nested:"true"`
		TyresDamage struct {
			RearLeft   uint8
			RearRight  uint8
			FrontLeft  uint8
			FrontRight uint8
		} `nested:"true"`
		BrakesDamage struct {
			RearLeft   uint8
			RearRight  uint8
			FrontLeft  uint8
			FrontRight uint8
		} `nested:"true"`
		FrontLeftWingDamage  uint8
		FrontRightWingDamage uint8
		RearWingDamage       uint8
		FloorDamage          uint8
		DiffuserDamage       uint8
		SidepodDamage        uint8
		DRSFault             bool
		GearBoxDamage        uint8
		EngineDamage         uint8
		EngineMGUHWear       uint8
		EngineESWear         uint8
		EngineCEWear         uint8
		EngineICEWear        uint8
		EngineMGUKWear       uint8
		EngineTCWear         uint8
	}
}
