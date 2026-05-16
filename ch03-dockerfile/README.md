# ch03-dockerfile — Dockerfile の書き方

書籍 第3章「Dockerfile の書き方 — マルチステージ・BuildKit・非 root 実行」対応ディレクトリ。

4 つのサブディレクトリにそれぞれ独立した Dockerfile サンプルがあります。順に `docker build` して動作確認できる構成です。

## サブディレクトリ一覧

| ディレクトリ | 章本文の対応 | 内容 |
|---|---|---|
| `01-hello/` | 3-2 節 | 最小の Dockerfile(`FROM` + `WORKDIR` + `COPY` + `CMD` の 5 行) |
| `02-multistage/` | 3-6 節 | Node.js + nginx のマルチステージビルド、最終 75.9 MB |
| `03-cache-mounts/` | 3-7 節 | `RUN --mount=type=cache` で npm キャッシュ永続化 |
| `04-non-root/` | 3-8 節 | `USER app` で非 root 化、`COPY --chown=` で所有権整備 |

## 動作確認手順

```bash
# 01-hello
cd 01-hello && docker build -t hello-dockerfile . && docker run --rm hello-dockerfile

# 02-multistage (ブラウザで http://localhost:8080 を開く)
cd ../02-multistage && docker build -t multistage-demo .
docker run -d -p 8080:80 --name multistage-demo multistage-demo
curl http://localhost:8080/
docker stop multistage-demo && docker rm multistage-demo

# 03-cache-mounts (2 回ビルドして 2 回目が CACHED になるのを確認)
cd ../03-cache-mounts && docker build -t cache-demo . && docker build -t cache-demo .

# 04-non-root
cd ../04-non-root && docker build -t non-root-demo .
docker run -d -p 8080:3000 --name non-root-demo non-root-demo
curl http://localhost:8080/    # "Running as: app" が返れば成功
docker exec non-root-demo id   # uid=100(app) gid=101(app) で動作確認
docker stop non-root-demo && docker rm non-root-demo
```

## 実機検証環境

- Docker Desktop: 4.73.0 (build 226246)
- Docker Engine (Server): 29.4.3
- BuildKit (default builder): v0.29.0
- Dockerfile syntax frontend: docker/dockerfile:1 (v1.24.0 stable)
- OS: macOS 26 (Apple Silicon arm64)

## 関連章

- 第4章: 同じ Dockerfile を `compose.yaml` の `build:` で参照
- 第8章: 秘密情報を `RUN --mount=type=secret` で扱う(本章では触れない)
- 第9章: マルチプラットフォーム対応 (`docker buildx build --platform`)
