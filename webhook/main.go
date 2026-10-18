package main

import (
	"io"
	"log"
	"net/http"
)

func main() {
    log.Println("Starting webhook server...")
	mux := http.NewServeMux()
	mux.HandleFunc("/webhook", func(_ http.ResponseWriter, r *http.Request) {
		body, _ := io.ReadAll(r.Body)
		log.Println(string(body))
	})
	http.ListenAndServe("localhost.com:9876", mux)
}
