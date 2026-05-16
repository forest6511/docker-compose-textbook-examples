# syntax=docker/dockerfile:1
FROM node:24-alpine
WORKDIR /app
COPY package.json ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm install --omit=dev
COPY . .
CMD ["node", "index.js"]
