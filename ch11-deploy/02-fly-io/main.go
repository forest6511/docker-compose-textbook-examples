package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	region := os.Getenv("FLY_REGION")
	if region == "" {
		region = "local"
	}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello from Fly.io region=%s port=%s\n", region, port)
	})
	http.ListenAndServe("0.0.0.0:"+port, nil)
}
