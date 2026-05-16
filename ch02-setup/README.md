# ch02-setup — Docker Desktop / Docker Engine セットアップ

書籍 第2章「Docker Desktop と Docker Engine のセットアップ」対応ディレクトリ。

第2章は実機セットアップ中心のため、`compose.yaml` / `Dockerfile` は登場しません。本ディレクトリには、章本文に登場する `docker version` / `docker run hello-world` / `docker run docker/welcome-to-docker` の実機出力を収録しています。

## ファイル一覧

| ファイル | 内容 | 取得コマンド |
|---|---|---|
| `docker-version-output.txt` | Client / Server バージョン情報 | `docker version` |
| `docker-info-output.txt` | デーモン情報(簡略版、先頭 50 行) | `docker info` |
| `hello-world-output.txt` | 最小コンテナ起動確認 | `docker rmi hello-world && docker run hello-world` |
| `welcome-output.txt` | Web サーバーコンテナの起動とポートマッピング確認 | `docker run -d -p 8080:80 --name welcome docker/welcome-to-docker` + `docker ps` |

## 章本文との対応

- 行 180-199 = `docker-version-output.txt`(クライアント Mac、サーバー Linux VM の二段表示)
- 行 211-230 = `hello-world-output.txt`(コールド Pull → コンテナ起動 → Hello メッセージ)
- 行 239-245 = `welcome-output.txt`(8080→80 ポート転送、`Up 2 seconds` ステータス)

## 実機検証環境

- Docker Desktop: 4.73.0 (build 226246)
- Docker Engine (Server): 29.4.3
- Docker Compose: v5.1.3
- Docker Buildx: v0.33.0-desktop.1
- OS: macOS 26 (Apple Silicon arm64)

## 再実行手順

```bash
# クリーンな状態で hello-world を再現
docker ps -a --filter ancestor=hello-world -q | xargs -r docker rm
docker rmi hello-world
docker run hello-world

# Welcome to Docker (ブラウザで http://localhost:8080 を開く)
docker run -d -p 8080:80 --name welcome docker/welcome-to-docker
docker ps --filter "name=welcome" --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'

# 後片付け
docker stop welcome && docker rm welcome
```

## 関連章

- 第3章: `Dockerfile` を書いて独自イメージをビルド
- 第4章: `compose.yaml` で複数コンテナをまとめて起動
