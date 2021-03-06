// Code generated by "stringer -type=Weather -trimprefix=Weather"; DO NOT EDIT.

package f12021

import "strconv"

func _() {
	// An "invalid array index" compiler error signifies that the constant values have changed.
	// Re-run the stringer command to generate them again.
	var x [1]struct{}
	_ = x[WeatherClear-0]
	_ = x[WeatherLight-1]
	_ = x[WeatherLightCloud-2]
	_ = x[WeatherOvercast-3]
	_ = x[WeatherLightRain-4]
	_ = x[WeatherHeavyRain-5]
	_ = x[WeatherStorm-6]
}

const _Weather_name = "ClearLightLightCloudOvercastLightRainHeavyRainStorm"

var _Weather_index = [...]uint8{0, 5, 10, 20, 28, 37, 46, 51}

func (i Weather) String() string {
	if i >= Weather(len(_Weather_index)-1) {
		return "Weather(" + strconv.FormatInt(int64(i), 10) + ")"
	}
	return _Weather_name[_Weather_index[i]:_Weather_index[i+1]]
}
