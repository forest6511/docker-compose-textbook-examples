# syntax=docker/dockerfile:1
FROM node:24-alpine
RUN addgroup -S app && adduser -S -G app app
WORKDIR /home/app
COPY --chown=app:app package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm install --omit=dev
COPY --chown=app:app server.js ./
USER app
EXPOSE 3000
CMD ["node", "server.js"]
