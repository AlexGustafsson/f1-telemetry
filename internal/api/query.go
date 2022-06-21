package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/prometheus/prometheus/model/timestamp"
	"github.com/prometheus/prometheus/promql"
	"github.com/prometheus/prometheus/promql/parser"
	"github.com/prometheus/prometheus/storage"
)

type QueryRangeRequest struct {
	Query      string   `json:"query"`
	Start      Duration `json:"from"`
	End        Duration `json:"to"`
	Interval   Duration `json:"interval"`
	MaxSamples int      `json:"maxSamples"`
}

type QueryRangeResponse struct {
	Warnings storage.Warnings `json:"warnings"`
	Result   parser.Value     `json:"result"`
}

func (a *API) queryRange(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}

	var request QueryRangeRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		fail(w, http.StatusBadRequest, err.Error())
		return
	}

	if request.Interval == 0 {
		request.Interval = Duration(10 * time.Millisecond)
	}
	if request.MaxSamples == 0 {
		request.MaxSamples = 1000
	}

	engine := promql.NewEngine(promql.EngineOpts{Timeout: 30 * time.Second, MaxSamples: request.MaxSamples})

	query, err := engine.NewRangeQuery(a.timeSeries.Storage, nil, request.Query, timestamp.Time(time.Duration(request.Start).Milliseconds()), timestamp.Time(time.Duration(request.End).Milliseconds()), time.Duration(request.Interval))
	if err != nil {
		fail(w, http.StatusBadRequest, err.Error())
		return
	}
	defer query.Close()

	result := query.Exec(r.Context())
	if result.Err != nil {
		fail(w, http.StatusInternalServerError, result.Err.Error())
		return
	}

	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&QueryRangeResponse{
		Warnings: result.Warnings,
		Result:   result.Value,
	})
}
