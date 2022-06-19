package f12021

//go:generate stringer -type=SessionType
type SessionType uint8

const (
	SessionTypeUnknown SessionType = iota
	SessionTypePractice1
	SessionTypePractice2
	SessionTypePractice3
	SessionTypeShortPractice
	SessionTypeQualifying1
	SessionTypeQualifying2
	SessionTypeQualifying3
	SessionTypeShortQualifying
	SessionTypeOneShotQualifying
	SessionTypeRace
	SessionTypeRace2
	SessionTypeRace3
	SessionTypeTimeTrial
)

type Formula uint8

const (
	Formula1Modern Formula = iota
	Formula1Classic
	Formula2
)

type PacketSession struct {
	PacketHeader `nested:"true"`

	Weather          Weather
	TrackTemperature int8
	AirTemperature   int8
	TotalLaps        uint8
	TrackLength      uint16
	SessionType      SessionType

	Track   Track
	Formula Formula

	SessionTimeLeft      uint16
	SessionDuration      uint16
	PitSpeedLimit        uint8
	GamePaused           uint8
	IsSpectating         uint8
	SpectatorCarIndex    uint8
	SLIProNativeSupport  uint8
	NumberOfMarshalZones uint8
	MarshalZones         [21]struct {
		ZoneStart float32
		ZoneFlag  int8
	}
	SafetyCarStatus                uint8
	NetworkGame                    uint8
	NumberOfWeatherForecastSamples uint8
	WeatherForecastSamples         [56]struct {
		SessionType            SessionType // TODO: Not correct, R3 is missing from weather forecast samples
		TimeOffset             uint8
		Weather                Weather
		TrackTemperature       int8
		TrackTemperatureChange int8
		AirTemperature         int8
		AirTemperatureChange   int8
		RainPercantage         uint8
	}
	ForecastAccuracy       uint8
	AIDifficulty           uint8
	SeasonLinkIdentifier   uint32
	WeekendLinkIdentifier  uint32
	SessionLinkIdentifier  uint32
	PitStopWindowIdealLap  uint8
	PitStopWindowLatestLap uint8
	PitStopRejoinPosition  uint8
	SteeringAssist         uint8
	BrakingAssist          uint8
	GearboxAssist          uint8
	PitAssist              uint8
	PitReleaseAssist       uint8
	ERSAssist              uint8
	DRSAssist              uint8
	DynamicRacingLine      uint8
	DynamicRacingLineType  uint8
}
