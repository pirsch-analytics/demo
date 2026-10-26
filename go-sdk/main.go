package main

import (
	"fmt"
	"log/slog"
	"net/http"
	"os"

	pirsch "github.com/pirsch-analytics/pirsch-go-sdk/v2/pkg"
)

func main() {
    serverPort := os.Getenv("PIRSCH_SERVER_PORT")
	baseURL:=os.Getenv("PIRSCH_BASE_URL")
	clientAccessKey := os.Getenv("PIRSCH_ACCESS_KEY")
	clientID := os.Getenv("PIRSCH_CLIENT_ID")
	clientSecret := os.Getenv("PIRSCH_CLIENT_SECRET")
	var client *pirsch.Client

	if clientAccessKey != "" {
		client = pirsch.NewClient("", clientAccessKey, &pirsch.ClientConfig{
			BaseURL: baseURL,
		})
	} else if clientID != "" && clientSecret != "" {
		client = pirsch.NewClient(clientID, clientSecret, &pirsch.ClientConfig{
			BaseURL: baseURL,
		})
	} else {
		slog.Error("Please configure an access key or client ID and secret")
		return
	}

	slog.Info("Starting server...", "port", serverPort)
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
	slog.Error("Error starting server", "err", http.ListenAndServe(fmt.Sprintf(":%s", serverPort), nil))
}
