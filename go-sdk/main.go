package main

import (
	"fmt"
	pirsch "github.com/pirsch-analytics/pirsch-go-sdk/v2/pkg"
	"log/slog"
	"net/http"
)

const (
	// The base URL. Usually https://pirsch.io.
	baseURL = "https://localhost.com:9999"

	// Your client secret (access key, not an oAuth client!).
	clientSecret = "pa_CMmYb2B15lMUM9tFt1GO9df4Efml0WvBgvGxb3ksCqif2"

	// The server port, in case you need to change it.
	serverPort = 8900
)

func main() {
	slog.Info("Starting server...", "port", serverPort)
	client := pirsch.NewClient("", clientSecret, &pirsch.ClientConfig{
		BaseURL: baseURL,
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// ignore the favicon
		if r.URL.Path == "/favicon.ico" {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		if err := client.PageView(r, nil); err != nil {
			slog.Error("Error sending page view to Pirsch", "err", err)
		} else {
			slog.Info("Sent page view to Pirsch")
		}

		// request client hints
		w.Header().Set("Accept-CH", "Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-Width, Sec-CH-Viewport-Width")
		_, _ = w.Write([]byte("<h1>Hello World!</h1>"))
	})
	slog.Error("Error starting server", "err", http.ListenAndServe(fmt.Sprintf(":%d", serverPort), nil))
}
