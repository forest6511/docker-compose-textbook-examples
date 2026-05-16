# syntax=docker/dockerfile:1
FROM --platform=$BUILDPLATFORM golang:1.24-alpine AS build
ARG TARGETOS
ARG TARGETARCH
ARG BUILDPLATFORM
ARG TARGETPLATFORM
WORKDIR /app
COPY main.go ./
RUN echo "build on $BUILDPLATFORM -> $TARGETPLATFORM" > /info.txt
RUN GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o /out/hello main.go

FROM alpine
COPY --from=build /out/hello /usr/local/bin/hello
COPY --from=build /info.txt /info.txt
CMD ["/usr/local/bin/hello"]
