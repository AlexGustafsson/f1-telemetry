package f12021

type EventCode string

const (
	// Sent when the session starts
	EventCodeSessionStarted EventCode = "SSTA"
	// Sent when the session ends
	EventCodeSessionEnded EventCode = "SEND"
	// When a driver achieves the fastest lap
	EventCodeFastestLap EventCode = "FTLP"
	// When a driver retires
	EventCodeRetirement EventCode = "RTMT"
	// Race control have enabled DRS
	EventCodeDRSEnabled EventCode = "DRSE"
	// Race control have disabled DRS
	EventCodeDRSDisabled EventCode = "DRSD"
	// Your team mate has entered the pits
	EventCodeTeamMateInPits EventCode = "TMPT"
	// The chequered flag has been waved
	EventCodeChequeredFlag EventCode = "CHQF"
	// The race winner is announced
	EventCodeRaceWinner EventCode = "RCWN"
	// A penalty has been issued – details in event
	EventCodePenaltyIssued EventCode = "PENA"
	// Speed trap has been triggered by fastest speed
	EventCodeSpeedTrapTriggered EventCode = "SPTP"
	// Start lights – number shown
	EventCodeStartLights EventCode = "STLG"
	// Lights out
	EventCodeLightsOut EventCode = "LGOT"
	// Drive through penalty served
	EventCodeDriveThroughPenaltyServed EventCode = "DTSV"
	// Stop go penalty served
	EventCodeStopAndGoPenaltyServed EventCode = "SGSV"
	// Flashback activated
	EventCodeFlashback EventCode = "FLBK"
	// Button status changed
	EventCodeButtonStatus EventCode = "BUTN"
)

type PacketEvent interface {
	EventCode() EventCode
}

type PacketEventHeader struct {
	PacketHeader `nested:"true"`
	Code         EventCode `length:"4"`
}

func (p PacketEventHeader) EventCode() EventCode {
	return p.Code
}

type PacketEventFastestLap struct {
	PacketEventHeader `nested:"true"`
	VehicleIndex      uint8
	LapTime           float32
	Padding           [3]byte
}

type PacketEventRetirement struct {
	PacketEventHeader `nested:"true"`
	VehicleIndex      uint8
	Padding           [7]byte
}

type PacketEventTeamMateInPits struct {
	PacketEventHeader `nested:"true"`
	VehicleIndex      uint8
	Padding           [7]byte
}

type PacketEventTeamRaceWinner struct {
	PacketEventHeader `nested:"true"`
	VehicleIndex      uint8
	Padding           [7]byte
}

type PacketEventPenaltyIssued struct {
	PacketEventHeader `nested:"true"`
	PenaltyType       uint8
	InfringementType  uint8
	VehicleIndex      uint8
	OtherVehicleIndex uint8
	Time              uint8
	Lap               uint8
	PlacesGained      uint8
	Padding           [1]byte
}

type PacketEventSpeedTrapTriggered struct {
	PacketEventHeader       `nested:"true"`
	VehicleIndex            uint8
	Speed                   float32
	OverallFastestInSession bool
	DriverFastestInSession  bool
	Padding                 [1]byte
}

type PacketEventStartLights struct {
	PacketEventHeader `nested:"true"`
	Lights            uint8
	Padding           [7]byte
}

type PacketEventDriveThroughPenaltyServed struct {
	PacketEventHeader `nested:"true"`
	VehicleIndex      uint8
	Padding           [7]byte
}

type PacketEventStopAndGoPenaltyServed struct {
	PacketEventHeader `nested:"true"`
	VehicleIndex      uint8
	Padding           [7]byte
}

type PacketEventFlashback struct {
	PacketEventHeader        `nested:"true"`
	FlashbackFrameIdentifier uint32
	FlashbackSessionTime     float32
}

type PacketEventButtonStatus struct {
	PacketEventHeader `nested:"true"`
	// ButtonStatus uint32
	ButtonStatus uint32
	Padding      [4]byte // There always seem to be 4B padding after button events; 0x03000000
	// TODO: Custom type, add helper functions such as IsButtonPressed(A), Buttons() -> []Button?
}

type PacketEventSessionStarted struct {
	PacketEventHeader `nested:"true"`
	Padding           [8]byte
}

type PacketEventSessionEnded struct {
	PacketEventHeader `nested:"true"`
	Padding           [8]byte
}

type PacketEventDRSEnabled struct {
	PacketEventHeader `nested:"true"`
	Padding           [8]byte
}

type PacketEventDRSDisabled struct {
	PacketEventHeader `nested:"true"`
	Padding           [8]byte
}

type PacketEventChequeredFlag struct {
	PacketEventHeader `nested:"true"`
	Padding           [8]byte
}

type PacketEventLightsOut struct {
	PacketEventHeader `nested:"true"`
	Padding           [8]byte
}

type PacketEventRaceWinner struct {
	PacketEventHeader `nested:"true"`
	Padding           [8]byte
}
