package f12021

//go:generate stringer -type=PacketID
type PacketID uint8

const (
	// Contains all motion data for player’s car – only sent while player is in control
	PacketIDMotion PacketID = iota
	//  Data about the session – track, time left
	PacketIDSession
	// Data about all the lap times of cars in the session
	PacketIDLapData
	// Various notable events that happen during a session
	PacketIDEvent
	// List of participants in the session, mostly relevant for multiplayer
	PacketIDParticipants
	// Packet detailing car setups for cars in the race
	PacketIDCarSetups
	// Telemetry data for all cars
	PacketIDCarTelemetry
	// Status data for all cars
	PacketIDCarStatus
	// Final classification confirmation at the end of a race
	PacketIDFinalClassification
	// Information about players in a multiplayer lobby
	PacketIDLobbyInfo
	//  Damage status for all cars
	PacketIDCarDamage
	//  Lap and tyre data for session
	PacketIDSessionHistory
)
