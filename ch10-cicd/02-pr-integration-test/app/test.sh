#!/bin/sh
set -e
echo "integration test starting"
sleep 1
# DB に接続できることを確認(Postgres が起動済の前提)
apk add --no-cache postgresql-client >/dev/null 2>&1
PGPASSWORD=change-me psql -h db -U app -d app -c "SELECT 1 AS ok;"
echo "integration test passed"
