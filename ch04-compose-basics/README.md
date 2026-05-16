# ch04-compose-basics — docker compose の基本

書籍 第4章「docker compose の基本 — services / networks / volumes と最初のスタック構築」対応ディレクトリ。

3 つのサブディレクトリにスタックの段階的拡張版を置いています。

## サブディレクトリ一覧

| ディレクトリ | 章本文の対応 | 構成 |
|---|---|---|
| `01-minimum/` | 4-3 / 4-4 節 | nginx 1 サービスの最小 compose.yaml |
| `02-web-db/` | 4-5 / 4-6 節 | Node.js Web (`/healthz` + `/users`) + PostgreSQL 17 |
| `03-with-redis/` | 4-10 節 | 上記 + Redis 7 キャッシュ層、`X-Cache: hit/miss` を返す |

## 動作確認手順

### 01-minimum

```bash
cd 01-minimum
docker compose up -d
curl http://localhost:8080/   # nginx welcome
docker compose down
```

### 02-web-db

```bash
cd 02-web-db
docker compose up -d --build
curl http://localhost:8080/healthz    # "OK"
curl http://localhost:8080/users      # users 3 件 JSON
docker compose logs --tail=5 web
docker compose down -v
```

### 03-with-redis

```bash
cd 03-with-redis
docker compose up -d --build
curl -i http://localhost:8080/users   # 1 回目: X-Cache: miss
curl -i http://localhost:8080/users   # 2 回目: X-Cache: hit
docker compose down -v
```

## 実機検証環境

- Docker Desktop: 4.73.0 (build 226246)
- Docker Engine (Server): 29.4.3
- Docker Compose: v5.1.3 (v2.40+ 互換)
- OS: macOS 26 (Apple Silicon arm64)
- 使用 image: nginx:1.27-alpine / postgres:17-alpine / redis:7-alpine / node:24-alpine

## 関連章

- 第3章: Web サービスの Dockerfile は Ch03 04-non-root の構造を継承(非 root + cache mount)
- 第5章: depends_on long form / healthcheck / profiles で本章の起動順問題を解決
- 第8章: 環境変数の直書きを env_file / secrets に切り出す
