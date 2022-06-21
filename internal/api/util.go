package api

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
}

func fail(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(&ErrorResponse{
		StatusCode: statusCode,
		Message:    message,
	})
}
