# ch11-deploy — 本番デプロイ(Cloud Run / Fly.io / Bridge to Kubernetes)

書籍 第 11 章「本番デプロイ — Cloud Run / Fly.io / Bridge to Kubernetes」対応ディレクトリ。

同じ Docker イメージを 3 つの異なるターゲット(Cloud Run / Fly.io / K8s)へデプロイする最小構成を 3 サンプルで揃えました。実機検証では `gcloud` CLI v552.0.0 + `flyctl` v0.4.27 + `docker compose bridge convert` の 3 ツールで全パターン動作確認済みです。

## サンプル一覧

| ディレクトリ | 内容 | 学べること |
|---|---|---|
| `01-cloud-run/` | Cloud Run へ Docker イメージをデプロイ | `0.0.0.0:$PORT` で listen するパターン、`gcloud run deploy` の最小フラグ |
| `02-fly-io/` | Fly.io へ Docker イメージをデプロイ | `fly.toml` の最小構成、`fly launch` での Dockerfile 自動検出 |
| `03-compose-bridge/` | `docker compose bridge convert` で compose.yaml を K8s manifest に変換 | 1 compose ファイルから Deployment / Service / Namespace / NetworkPolicy / kustomization が 10 ファイル生成される |

## ローカルで試す(01-cloud-run)

各サブディレクトリには Go の HTTP サーバ(`$PORT` env を読んで listen するだけのサンプルアプリ)が入っています。

```bash
cd 01-cloud-run
docker build -t cloud-run-demo .
docker run --rm -p 8080:8080 -e PORT=8080 cloud-run-demo &
curl http://localhost:8080/
# → "Hello from Cloud Run"
```

実際のクラウドデプロイは各サブディレクトリの README に従ってください。

## 前提ツール

| ツール | バージョン |
|---|---|
| gcloud CLI | v552.0.0(Cloud Run 用) |
| flyctl | v0.4.27(Fly.io 用) |
| docker compose bridge | Docker Desktop 4.73 同梱 |

## 動作確認環境

- Docker Desktop 4.73.0 (build 226246)
- Docker Compose v5.1.3 (Desktop 同梱)
- Docker Engine v29.4.3
- OS: macOS 26 (Apple Silicon arm64)

## 関連章

- 第 9 章: マルチプラットフォームビルド(Cloud Run / Fly.io は linux/amd64 が無難)
- 第 10 章: GitHub Actions から本章のデプロイを自動化する
- 付録 A の A-3-4: Cloud Run の `$PORT` 固定で起動失敗する罠
