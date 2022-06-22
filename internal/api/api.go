package api

import (
	"net/http"

	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
)

type API struct {
	mux        *http.ServeMux
	timeSeries *timeseries.TimeSeries
}

func New(timeSeries *timeseries.TimeSeries) *API {
	mux := http.NewServeMux()

	api := &API{
		mux:        mux,
		timeSeries: timeSeries,
	}

	mux.HandleFunc("/api/v1/query/range", api.queryRange)
	mux.HandleFunc("/api/v1/labels/", api.labelValues)
	mux.HandleFunc("/api/v1/labels", api.labelNames)

	return api
}

func (a *API) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	a.mux.ServeHTTP(w, r)
}
