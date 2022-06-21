package api

import (
	"encoding/json"
	"errors"
	"time"
)

type Duration time.Duration

func (d Duration) MarshalJSON() ([]byte, error) {
	return json.Marshal(time.Duration(d).String())
}

func (d *Duration) UnmarshalJSON(b []byte) error {
	var v interface{}
	if err := json.Unmarshal(b, &v); err != nil {
		return err
	}
	switch value := v.(type) {
	case float64:
		*d = Duration(time.Duration(value))
		return nil
	case string:
		pd, err := time.ParseDuration(value)
		if err != nil {
			return err
		}
		*d = Duration(pd)
		return nil
	default:
		return errors.New("invalid duration")
	}
}
