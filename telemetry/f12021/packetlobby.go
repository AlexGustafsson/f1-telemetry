package f12021

type ReadyStatus uint8

const (
	ReadyStatusNotReady ReadyStatus = iota
	ReadyStatusReady
	ReadyStatusSpectating
)

type PacketLobbyInfo struct {
	PacketHeader `nested:"true"`

	Players   uint8
	LobbyInfo [22]struct {
		IsAIControlled bool
		Team           Team
		Nationality    Nationality
		Name           string `length:"48"`
		CarNumber      uint8
		ReadyStatus    ReadyStatus
	}
}
