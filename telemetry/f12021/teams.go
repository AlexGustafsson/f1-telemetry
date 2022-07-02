package f12021

//go:generate stringer -type=Team -trimprefix=Team
type Team uint8

const (
	TeamMercedes Team = iota
	TeamFerrari
	TeamRedBullRacing
	TeamWilliams
	TeamAstonMartin
	TeamAlpine
	TeamAlphaTauri
	TeamHaas
	TeamMcLaren
	TeamAlfaRomeo
)

const (
	TeamArtGP2019 Team = iota + 42
	TeamCampos2019
	TreamCarlin2019
	TeamSauberJuniorCharouz2019
	TeamDams2019
	TeamUniVirtuosi2019
	TeamMPMotorsport2019
	TeamPrema2019
	TeamTrident2019
	TeamArden2019
)

const (
	TeamArtGP2020 Team = iota + 70
	TeamCampos2020
	TreamCarlin2020
	TeamCharouz2020
	TeamDams2020
	TeamUniVirtuosi2020
	TeamMPMotorsport2020
	TeamPrema2020
	TeamTrident2020
	TeamBWT2020
	TeamHitech2020
)

const (
	TeamMercedes2020 Team = iota + 85
	TeamFerrari2020
	TeamRedBull2020
	TeamWilliams2020
	TeamRacingPoint2020
	TeamRenault2020
	TeamAlphaTauri2020
	TeamHaas2020
	TeamMcLaren2020
	TeamAlfaRomeo2020
)

const TeamNoTeam Team = 255
