#!/bin/sh
set -e

URL="${URL:-http://app:3000/healthz}"
COUNT="${COUNT:-10}"

echo "Hitting $URL x $COUNT times..."
for i in $(seq 1 "$COUNT"); do
  curl -fsS "$URL" >/dev/null && echo "  hit $i: OK"
done
echo "loadtest done."
