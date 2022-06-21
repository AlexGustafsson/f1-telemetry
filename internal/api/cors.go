package api

import "net/http"

func (a *API) handleCORS(w http.ResponseWriter, r *http.Request) {
	// TODO: allow list?
	w.Header().Set("Access-Control-Allow-Origin", "*")
}
