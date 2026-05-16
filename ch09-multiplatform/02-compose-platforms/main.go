package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Printf("compose-built %s/%s\n", runtime.GOOS, runtime.GOARCH)
}
