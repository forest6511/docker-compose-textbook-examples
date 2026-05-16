#!/bin/sh
set -e

echo "Running migration..."
psql "postgresql://app:secret@db:5432/appdb" \
  -c "CREATE TABLE IF NOT EXISTS migrations (id SERIAL PRIMARY KEY, run_at TIMESTAMP DEFAULT NOW());" \
  -c "INSERT INTO migrations DEFAULT VALUES;"
echo "Migration done."
