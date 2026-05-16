# ch08-secrets-env — Secrets と環境変数(12-factor 準拠)

書籍 第 8 章「Secrets と環境変数 — 12-factor 準拠」対応ディレクトリ。

`.env` ファイルの 4 つのロード経路、`environment:` と `env_file:` の優先順位、Compose の `secrets:` 短/長形式、Dockerfile の `RUN --mount=type=secret` を、ハンズオンで確認できる 3 サンプルを揃えました。

## サンプル一覧

| ディレクトリ | 内容 | 学べること |
|---|---|---|
| `01-env-file/` | `.env` と `--env-file` の挙動差分 | `${VAR:-default}` / `${VAR:?error}` の挙動、シェル env vs `.env` vs `environment:` の優先順位 |
| `02-secrets-from-file/` | ファイル由来 secret を PostgreSQL に渡す | `POSTGRES_PASSWORD_FILE` で `/run/secrets/db_password` を読み込むパターン、長形式 `mode:` が file ソースで静かに無視される本書独自検証 |
| `03-buildkit-secret/` | Dockerfile `RUN --mount=type=secret` を Compose の `build.secrets` から渡す | `.npmrc` 等の秘密ファイルがイメージレイヤーに残らないことを `docker history` で確認 |

## 試す

```bash
cd 01-env-file
docker compose config           # .env が展開された最終形を確認
docker compose run --rm app env
docker compose down
```

## 動作確認環境

- Docker Desktop 4.73.0 (build 226246)
- Docker Compose v5.1.3 (Desktop 同梱)
- Docker Engine v29.4.3
- Docker Buildx v0.33.0-desktop.1
- OS: macOS 26 (Apple Silicon arm64)

## 関連章

- 第 5 章: `environment:` と `env_file:` の基本キー
- 第 3 章: Dockerfile の `RUN --mount=type=secret` 構文(`# syntax=docker/dockerfile:1` 必須)
- 付録 A の A-5-1〜A-5-4: secrets / 環境変数で踏みやすい落とし穴のトラブルシュート
- 第 11 章: Cloud Run / Fly.io へ secret を渡す本番デプロイパターン
