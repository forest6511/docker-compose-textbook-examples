# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM golang:1.24-alpine AS build
ARG TARGETOS
ARG TARGETARCH
WORKDIR /app
COPY main.go ./
RUN GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go build -o /out/server main.go

FROM alpine
COPY --from=build /out/server /usr/local/bin/server
CMD ["/usr/local/bin/server"]
