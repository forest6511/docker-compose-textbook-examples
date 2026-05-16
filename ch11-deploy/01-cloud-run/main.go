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
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello from Cloud Run on port %s\n", port)
	})
	fmt.Printf("listening on :%s\n", port)
	http.ListenAndServe("0.0.0.0:"+port, nil)
}
