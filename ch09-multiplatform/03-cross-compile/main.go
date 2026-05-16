package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Printf("native-feel binary on %s/%s\n", runtime.GOOS, runtime.GOARCH)
}
