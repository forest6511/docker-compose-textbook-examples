# syntax=docker/dockerfile:1
FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm install
COPY src ./src
COPY scripts ./scripts
COPY schema.txt ./
EXPOSE 3000
CMD ["node", "src/server.js"]
