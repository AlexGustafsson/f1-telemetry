package f12021

//go:generate stringer -type=Weather -trimprefix=Weather
type Weather uint8

const (
	WeatherClear Weather = iota
	WeatherLight
	WeatherLightCloud
	WeatherOvercast
	WeatherLightRain
	WeatherHeavyRain
	WeatherStorm
)
