package f12021

//go:generate stringer -type=Track -trimprefix=Track
type Track int8

const (
	TrackUnknown Track = iota - 1
	TrackMelbourne
	TrackPaulRicard
	TrackShanghai
	TrackSakhir
	TrackCatalunya
	TrackMonaco
	TrackMontreal
	TrackSilverstone
	TrackHockenheim
	TrackHungaroring
	TrackSpa
	TrackMonza
	TrackSingapore
	TrackSuzuka
	TrackAbuDhabi
	TrackTexas
	TrackBrazil
	TrackAustria
	TrackSochi
	TrackMexico
	TrackBaku
	TrackSakhirShort
	TrackSilverstoneShort
	TrackTexasShort
	TrackSuzukaShort
	TrackHanoi
	TrackZandvoort
	TrackImola
	TrackPortimão
	TrackJeddah
)
