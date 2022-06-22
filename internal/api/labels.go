package api

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/prometheus/prometheus/storage"
)

type LabelNamesResponse struct {
	Warnings storage.Warnings `json:"warnings"`
	Labels   []string         `json:"labels"`
}

type LabelValuesResponse struct {
	Warnings storage.Warnings `json:"warnings"`
	Values   []string         `json:"values"`
}

func (a *API) labelNames(w http.ResponseWriter, r *http.Request) {
	a.handleCORS(w, r)
	if r.Method == http.MethodOptions {
		return
	} else if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	startString := r.URL.Query().Get("from")
	endString := r.URL.Query().Get("to")
	if startString == "" || endString == "" {
		fail(w, http.StatusBadRequest, "missing requried query parameters: from, to")
		return
	}

	start, err := time.ParseDuration(startString)
	if err != nil {
		fail(w, http.StatusBadRequest, "failed to parse duration in 'from'")
		return
	}

	end, err := time.ParseDuration(endString)
	if err != nil {
		fail(w, http.StatusBadRequest, "failed to parse duration in 'from'")
		return
	}

	querier, err := a.timeSeries.Storage.Querier(r.Context(), start.Milliseconds(), end.Milliseconds())
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}
	defer querier.Close()

	labels, warnings, err := querier.LabelNames()
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&LabelNamesResponse{
		Warnings: warnings,
		Labels:   labels,
	})
}

func (a *API) labelValues(w http.ResponseWriter, r *http.Request) {
	a.handleCORS(w, r)
	if r.Method == http.MethodOptions {
		return
	} else if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	startString := r.URL.Query().Get("from")
	endString := r.URL.Query().Get("to")
	if startString == "" || endString == "" {
		fail(w, http.StatusBadRequest, "missing requried query parameters: from, to")
		return
	}

	start, err := time.ParseDuration(startString)
	if err != nil {
		fail(w, http.StatusBadRequest, "failed to parse duration in 'from'")
		return
	}

	end, err := time.ParseDuration(endString)
	if err != nil {
		fail(w, http.StatusBadRequest, "failed to parse duration in 'from'")
		return
	}

	name := strings.TrimPrefix(r.URL.Path, "/api/v1/labels/")

	querier, err := a.timeSeries.Storage.Querier(r.Context(), start.Milliseconds(), end.Milliseconds())
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}
	defer querier.Close()

	values, warnings, err := querier.LabelValues(name)
	if err != nil {
		fail(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&LabelValuesResponse{
		Warnings: warnings,
		Values:   values,
	})
}
