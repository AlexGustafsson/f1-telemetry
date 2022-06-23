package api

import (
	"net/http"

	"github.com/AlexGustafsson/f1-telemetry/internal/timeseries"
)

type API struct {
	mux        *http.ServeMux
	timeSeries *timeseries.TimeSeries
}

func NewServer(timeSeries *timeseries.TimeSeries) *API {
	mux := http.NewServeMux()

	api := &API{
		mux:        mux,
		timeSeries: timeSeries,
	}

	mux.HandleFunc("/query/range", api.queryRange)
	mux.HandleFunc("/labels/", api.labelValues)
	mux.HandleFunc("/labels", api.labelNames)

	return api
}

func (a *API) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	a.mux.ServeHTTP(w, r)
}
