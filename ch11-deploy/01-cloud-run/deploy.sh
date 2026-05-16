#!/bin/bash
# Cloud Run デプロイ手順(参考)
# 事前: gcloud auth login + gcloud config set project YOUR_PROJECT
set -e

SERVICE="ch11-cloud-run-demo"
REGION="asia-northeast1"
IMAGE="ghcr.io/YOUR_GH_USER/ch11-deploy:latest"

gcloud run deploy "$SERVICE" \
  --image="$IMAGE" \
  --region="$REGION" \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --concurrency=80 \
  --max-instances=10 \
  --min-instances=0 \
  --allow-unauthenticated
