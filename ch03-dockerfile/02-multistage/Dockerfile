# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /src
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY src ./src
RUN node src/build.js > /tmp/index.html

FROM nginx:1.27-alpine
COPY --from=build /tmp/index.html /usr/share/nginx/html/index.html
EXPOSE 80
