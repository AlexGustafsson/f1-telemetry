package f12021

type SurfaceType uint8

const (
	SurfaceTypeTarmac SurfaceType = iota
	SurfaceTypeRumbleStrip
	SurfaceTypeConcrete
	SurfaceTypeRock
	SurfaceTypeGravel
	SurfaceTypeMud
	SurfaceTypeSand
	SurfaceTypeGrass
	SurfaceTypeWater
	SurfaceTypeCobblestone
	SurfaceTypeMetal
	SurfaceTypeRidged
)

type PacketCarTelemetry struct {
	PacketHeader `nested:"true"`

	Telemetry [22]struct {
		Speed             uint16
		Throttle          float32
		Steer             float32
		Brake             float32
		Clutch            uint8
		Gear              int8
		EngineRPM         uint16
		DRS               bool
		RevLightsPercent  uint8
		RevLightsBitValue uint16
		BrakesTemperature struct {
			RearLeft   uint16
			RearRight  uint16
			FrontLeft  uint16
			FrontRight uint16
		} `nested:"true"`
		TyresSurfaceTemperature struct {
			RearLeft   uint8
			RearRight  uint8
			FrontLeft  uint8
			FrontRight uint8
		} `nested:"true"`
		TyresInnerTemperature struct {
			RearLeft   uint8
			RearRight  uint8
			FrontLeft  uint8
			FrontRight uint8
		} `nested:"true"`
		EngineTemperature uint16
		TyresPressure     struct {
			RearLeft   float32
			RearRight  float32
			FrontLeft  float32
			FrontRight float32
		} `nested:"true"`
		SurfacyType struct {
			RearLeft   SurfaceType
			RearRight  SurfaceType
			FrontLeft  SurfaceType
			FrontRight SurfaceType
		} `nested:"true"`
	}

	MFDPanelIndex                uint8
	MFDPanelIndexSecondaryPlayer uint8
	SuggestedGear                int8
}
