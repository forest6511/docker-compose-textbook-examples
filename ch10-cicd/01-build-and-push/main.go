package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Printf("ch10 sample running on %s/%s\n",
		runtime.GOOS, runtime.GOARCH)
}
