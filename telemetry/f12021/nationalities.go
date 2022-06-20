package f12021

//go:generate stringer -type=Nationality
type Nationality uint8

const (
	NationalityUnknown Nationality = iota
	NationalityAmerican
	NationalityArgentinean
	NationalityAustralian
	NationalityAustrian
	NationalityAzerbaijani
	NationalityBahraini
	NationalityBelgian
	NationalityBolivian
	NationalityBrazilian
	NationalityBritish
	NationalityBulgarian
	NationalityCameroonian
	NationalityCanadian
	NationalityChilean
	NationalityChinese
	NationalityColombian
	NationalityCostaRican
	NationalityCroatian
	NationalityCypriot
	NationalityCzech
	NationalityDanish
	NationalityDutch
	NationalityEcuadorian
	NationalityEnglish
	NationalityEmirian
	NationalityEstonian
	NationalityFinnish
	NationalityGreek
	NationalityGuatemalan
	NationalityHonduran
	NationalityHongKonger
	NationalityHungarian
	NationalityIcelander
	NationalityIndian
	NationalityIndonesian
	NationalityIrish
	NationalityIsraeli
	NationalityItalian
	NationalityJamaican
	NationalityJapanese
	NationalityJordanian
	NationalityKuwaiti
	NationalityLatvian
	NationalityLebanese
	NationalityLithuanian
	NationalityLuxembourger
	NationalityMalaysian
	NationalityMaltese
	NationalityMexican
	NationalityMonegasque
	NationalityNewZealander
	NationalityNicaraguan
	NationalityNorthernIrish
	NationalityNorwegian
	NationalityParaguayan
	NationalityPeruvian
	NationalityPolish
	NationalityPortuguese
	NationalityQatari
	NationalityRomanian
	NationalityRussian
	NationalitySalvadoran
	NationalitySaudi
	NationalityScottish
	NationalitySerbian
	NationalitySingaporean
	NationalitySlovakian
	NationalitySlovenian
	NationalitySouthKorean
	NationalitySouthAfrican
	NationalitySpanish
	NationalitySwedish
	NationalitySwiss
	NationalityThai
	NationalityTurkish
	NationalityUruguayan
	NationalityUkrainian
	NationalityVenezuelan
	NationalityBarbadian
	NationalityWelsh
	NationalityVietnamese
)