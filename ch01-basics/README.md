# ch01-basics — Docker の基礎

書籍 第1章「Docker の基礎 — コンテナとイメージ、なぜ Docker か」対応ディレクトリ。

第1章は概念中心のため、`compose.yaml` / `Dockerfile` は登場しません。本ディレクトリには、章末で次章への橋渡しに使う実機出力テキストのみ収録しています。

## ファイル一覧

| ファイル | 内容 | 取得コマンド |
|---|---|---|
| `docker-version.txt` | クライアントとサーバーのバージョン情報 | `docker version` |
| `hello-world.txt` | 最小コンテナの起動確認(初回 Pull 含む) | `docker rmi hello-world && docker run hello-world` |

## 実機検証環境

- Docker Desktop: 4.73.0 (build 226246)
- Docker Engine (Server): 29.4.3
- Docker Compose: v5.1.3
- Docker Buildx: v0.33.0-desktop.1
- OS: macOS 26 (Apple Silicon arm64)

## 関連章

- 第2章: 同じコマンドを実機で動かしながらインストール手順を確認
- 第3章: `Dockerfile` を書いて独自イメージをビルド
