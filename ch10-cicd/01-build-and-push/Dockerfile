# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM golang:1.24-alpine AS build
ARG TARGETOS
ARG TARGETARCH
WORKDIR /app
COPY main.go ./
RUN GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o /out/app main.go

FROM alpine
COPY --from=build /out/app /usr/local/bin/app
CMD ["/usr/local/bin/app"]
