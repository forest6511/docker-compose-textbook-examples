# Ch12 業務シーン20ケース集 — 代表サンプル

本書 Ch12 で扱った 20 ケースのうち、典型的な 6 ケースをこのディレクトリに同期しています。本文中の compose.yaml はそのままコピペで動く設計ですが、`git clone && docker compose up -d` の流れで素早く試したい場合はこちらを利用してください。

## 同期されているケース

- `01-postgres-app/` — ケース 1: PostgreSQL + アプリのローカル開発環境
- `06-mailhog/` — ケース 6: Mailhog で SMTP テスト
- `11-nginx-static/` — ケース 11: Nginx で静的サイト配信
- `13-traefik/` — ケース 13: Traefik でホスト名ベースルーティング
- `17-prom-grafana/` — ケース 17: Prometheus + Grafana メトリクス可視化
- `20-fullstack/` — ケース 20: フルスタック開発環境(合わせ技)

## その他のケース

Ch12 で扱った残り 14 ケース(MySQL / MongoDB / Redis / Valkey / Selenium / RabbitMQ / Adminer / Nginx proxy / Traefik+TLS / MinIO / Elasticsearch+Kibana / postgres-exporter / WordPress)は本書の compose.yaml をそのままコピペして動かしてください。

## 共通の前提

- Docker Desktop 4.73+ または Docker Engine v29.4+
- Docker Compose v2.40+(`docker compose` CLI、v5 系の `docker compose` を含む)
- macOS / Linux / WSL2 で動作確認済み
