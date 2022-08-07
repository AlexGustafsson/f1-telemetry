package api

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
	"github.com/prometheus/prometheus/model/labels"
)

type Session struct {
	ID    string `json:"id"`
	Type  string `json:"type"`
	Game  string `json:"game"`
	Track string `json:"track"`
}

type Car struct {
	ID     string `json:"id"`
	Team   string `json:"team"`
	Driver string `json:"driver"`
	Player string `json:"player,omitempty"`
	IsAI   *bool  `json:"isAi"`
	Number *int   `json:"number"`
}

func (a *API) sessions(w http.ResponseWriter, r *http.Request) {
	a.handleCORS(w, r)
	if r.Method == http.MethodOptions {
		return
	} else if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// As the time is not real world time, but session time, we know that it is unlikely
	// to ever surpass 2h
	querier, err := a.timeSeries.Storage.Querier(r.Context(), 0, (2 * time.Hour).Milliseconds())
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}
	defer querier.Close()

	sessionIDs, _, err := querier.LabelValues(timeseries.LabelSession)
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}

	sessions := make([]Session, 0)

	for _, id := range sessionIDs {
		matcher, err := labels.NewMatcher(labels.MatchEqual, timeseries.LabelSession, id)
		if err != nil {
			fail(w, http.StatusInternalServerError, err.Error())
			return
		}

		series := querier.Select(false, nil, matcher)
		if err := series.Err(); err != nil {
			fail(w, http.StatusInternalServerError, err.Error())
			return
		}

		series.Next()
		labels := series.At().Labels().Map()
		sessions = append(sessions, Session{
			ID:    id,
			Type:  labels[timeseries.LabelSessionType],
			Game:  labels[timeseries.LabelGame],
			Track: labels[timeseries.LabelTrack],
		})
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(sessions)
}

func (a *API) cars(w http.ResponseWriter, r *http.Request) {
	a.handleCORS(w, r)
	if r.Method == http.MethodOptions {
		return
	} else if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	session := strings.TrimSuffix(strings.TrimPrefix(r.URL.Path, "/api/v1/sessions/"), "/cars")

	sessionMatcher, err := labels.NewMatcher(labels.MatchEqual, timeseries.LabelSession, session)
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}

	// As the time is not real world time, but session time, we know that it is unlikely
	// to ever surpass 2h
	querier, err := a.timeSeries.Storage.Querier(r.Context(), 0, (2 * time.Hour).Milliseconds())
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}
	defer querier.Close()

	carIDs, _, err := querier.LabelValues(timeseries.LabelCar, sessionMatcher)
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}

	cars := make([]Car, 0)
	for _, id := range carIDs {
		carMatcher, err := labels.NewMatcher(labels.MatchEqual, timeseries.LabelCar, id)
		if err != nil {
			fail(w, http.StatusInternalServerError, err.Error())
			return
		}

		series := querier.Select(false, nil, sessionMatcher, carMatcher)
		if err := series.Err(); err != nil {
			fail(w, http.StatusInternalServerError, err.Error())
			return
		}

		series.Next()
		labels := series.At().Labels().Map()

		car := Car{
			ID:     labels[timeseries.LabelCar],
			Team:   labels[timeseries.LabelTeam],
			Driver: labels[timeseries.LabelDriver],
			Player: labels[timeseries.LabelPlayer],
			// IsAI:   labels[timeseries.LabelPlayerIsAI],
			// Number: labels[timeseries.LabelCarNumber]
		}

		if raw, ok := labels[timeseries.LabelPlayerIsAI]; ok {
			value, err := strconv.ParseBool(raw)
			if err == nil {
				car.IsAI = &value
			}
		}

		if raw, ok := labels[timeseries.LabelCarNumber]; ok {
			intermediate, err := strconv.ParseInt(raw, 10, 32)
			value := int(intermediate)
			if err == nil {
				car.Number = &value
			}
		}

		cars = append(cars, car)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(cars)
}
