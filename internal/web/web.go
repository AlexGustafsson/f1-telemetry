package web

import (
	"embed"
	"io/fs"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

//go:embed static/*
var static embed.FS

type Server struct {
	static  fs.FS
	handler http.Handler
}

func FS() (fs.FS, error) {
	return fs.Sub(fs.FS(static), "static")
}

func NewServer() (*Server, error) {
	static, err := FS()
	if err != nil {
		return nil, err
	}

	return &Server{
		static:  static,
		handler: http.FileServer(http.FS(static)),
	}, nil
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if path == "/" {
		path = "/index.html"
	}

	file, err := s.static.Open(strings.TrimPrefix(path, "/"))
	if os.IsNotExist(err) {
		// Server HTML as fallback
		indexFile, err := s.static.Open("index.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		data, err := ioutil.ReadAll(indexFile)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		w.Write(data)
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	file.Close()

	// Serve a static file
	s.handler.ServeHTTP(w, r)
}
