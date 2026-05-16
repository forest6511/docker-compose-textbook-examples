# ch05-compose-keys

第5章「compose.yaml 主要キー徹底解説」のサンプル。

## 動作確認環境

- Docker Desktop 4.73.0 (build 226246)
- Docker Compose v5.1.3(Desktop 同梱)
- Docker Engine v29.4.3 (Server)

## サンプル一覧

### 01-depends-on

depends_on long form の 3 condition (`service_healthy` / `service_completed_successfully` / `service_started`) と
healthcheck を組み合わせて、Web + DB + migrate + cache の 4 サービスを起動する。

```bash
cd 01-depends-on
docker compose up -d --wait
docker compose ps
curl http://localhost:8080/users
docker compose down -v
```

### 02-profiles

`profiles:` キーで開発専用 (pgadmin) / 負荷試験 (loadtest) サービスを切り分ける。

```bash
cd 02-profiles
# 通常起動: app + db のみ
docker compose up -d --wait

# debug profile を有効化: pgadmin も追加で立ち上がる
docker compose --profile debug up -d

# loadtest を名指し実行: profile [test] が自動有効化される
docker compose run --rm loadtest

# 片付け
docker compose --profile debug --profile test down -v
```
