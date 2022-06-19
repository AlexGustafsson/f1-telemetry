package f12021

import (
	"fmt"
	"reflect"

	"github.com/AlexGustafsson/f1-telemetry/telemetry/f1struct"
)

var packetTypes = map[PacketID]reflect.Type{
	PacketIDMotion:              reflect.TypeOf(PacketMotion{}),
	PacketIDSession:             reflect.TypeOf(PacketSession{}),
	PacketIDLapData:             reflect.TypeOf(PacketLap{}),
	PacketIDParticipants:        reflect.TypeOf(PacketParticipants{}),
	PacketIDCarSetups:           reflect.TypeOf(PacketCarSetup{}),
	PacketIDCarTelemetry:        reflect.TypeOf(PacketCarTelemetry{}),
	PacketIDCarStatus:           reflect.TypeOf(PacketCarStatus{}),
	PacketIDFinalClassification: reflect.TypeOf(PacketFinalClassification{}),
	PacketIDLobbyInfo:           reflect.TypeOf(PacketLobbyInfo{}),
	PacketIDCarDamage:           reflect.TypeOf(PacketCarDamage{}),
	PacketIDSessionHistory:      reflect.TypeOf(PacketSessionHistory{}),
}

var eventPacketTypes = map[EventCode]reflect.Type{
	EventCodeSessionStarted:            reflect.TypeOf(PacketEventSessionStarted{}),
	EventCodeSessionEnded:              reflect.TypeOf(PacketEventSessionEnded{}),
	EventCodeFastestLap:                reflect.TypeOf(PacketEventFastestLap{}),
	EventCodeRetirement:                reflect.TypeOf(PacketEventRetirement{}),
	EventCodeDRSEnabled:                reflect.TypeOf(PacketEventDRSEnabled{}),
	EventCodeDRSDisabled:               reflect.TypeOf(PacketEventDRSDisabled{}),
	EventCodeTeamMateInPits:            reflect.TypeOf(PacketEventTeamMateInPits{}),
	EventCodeChequeredFlag:             reflect.TypeOf(PacketEventChequeredFlag{}),
	EventCodeRaceWinner:                reflect.TypeOf(PacketEventRaceWinner{}),
	EventCodePenaltyIssued:             reflect.TypeOf(PacketEventPenaltyIssued{}),
	EventCodeSpeedTrapTriggered:        reflect.TypeOf(PacketEventSpeedTrapTriggered{}),
	EventCodeStartLights:               reflect.TypeOf(PacketEventStartLights{}),
	EventCodeLightsOut:                 reflect.TypeOf(PacketEventLightsOut{}),
	EventCodeDriveThroughPenaltyServed: reflect.TypeOf(PacketEventDriveThroughPenaltyServed{}),
	EventCodeStopAndGoPenaltyServed:    reflect.TypeOf(PacketEventStopAndGoPenaltyServed{}),
	EventCodeFlashback:                 reflect.TypeOf(PacketEventFlashback{}),
	EventCodeButtonStatus:              reflect.TypeOf(PacketEventButtonStatus{}),
}

func ParsePacket(data []byte) (any, error) {
	// TODO: Parsed two-three times currently. Not sure if the performance hit matters, though
	var packetHeader PacketHeader
	if err := f1struct.Unmarshal(data, &packetHeader); err != nil {
		return nil, err
	}

	var packetType reflect.Type
	if packetHeader.PacketID == PacketIDEvent {
		// TODO: Parsed twice currently. Not sure if the performance hit matters, though
		var eventHeader PacketEventHeader
		if err := f1struct.Unmarshal(data, &eventHeader); err != nil {
			return nil, err
		}

		var ok bool
		packetType, ok = eventPacketTypes[eventHeader.Code]
		if !ok {
			return nil, fmt.Errorf("unsupported event packet code: %s", eventHeader.Code)
		}
	} else {
		var ok bool
		packetType, ok = packetTypes[packetHeader.PacketID]
		if !ok {
			return nil, fmt.Errorf("unsupported packet id: %d (%s)", packetHeader.PacketID, packetHeader.PacketID)
		}
	}

	v := reflect.New(packetType).Interface()
	if err := f1struct.Unmarshal(data, v); err != nil {
		return nil, err
	}

	packet := v.(Packet)

	return packet, nil
}
