package timeseries

func convertBoolToFloat64(b bool) float64 {
	if b {
		return 1
	}
	return 0
}
