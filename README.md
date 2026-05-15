# docker-compose-textbook-examples

書籍『Docker Compose の教科書 — 現場で使える基礎から CI/CD・本番デプロイまで』(森川 陽介・著、Amazon Kindle ¥980 KU、ASIN 取得後追記)の動作確認済みサンプルコード。

## 使い方

各章ディレクトリは独立した最小構成です。書籍本文と対応付けて読み進めてください。

```bash
git clone https://github.com/forest6511/docker-compose-textbook-examples.git
cd docker-compose-textbook-examples/ch04-compose-basics
docker compose up -d
```

## 動作確認バージョン

| ツール | バージョン |
|---|---|
| Docker Desktop | 4.73.0 |
| Docker Engine | v29.4.3 |
| Docker Compose | v2.40.3(v2 系 CLI、本書の主軸) |
| Docker Buildx | v0.33.0 |

> 上記より新しい安定版でも動作するはずですが、本書執筆時の検証環境はこの組合せです。

## 章別ディレクトリ

| ディレクトリ | 章 | 内容 |
|---|---|---|
| `ch01-basics/` | Ch1 | Docker / コンテナ基礎、`docker run` Hello World |
| `ch02-setup/` | Ch2 | Docker Desktop / Engine セットアップ確認 |
| `ch03-dockerfile/` | Ch3 | Dockerfile、マルチステージビルド、BuildKit cache mounts |
| `ch04-compose-basics/` | Ch4 | services / networks / volumes 基本 |
| `ch05-compose-keys/` | Ch5 | compose.yaml 主要キー徹底解説 |
| `ch06-compose-watch/` | Ch6 | `docker compose watch`、develop.watch |
| `ch07-multi-compose/` | Ch7 | 複数 Compose ファイル合成、include、profiles |
| `ch08-secrets-env/` | Ch8 | secrets、環境変数、12-factor |
| `ch09-multiplatform/` | Ch9 | buildx、Build Cloud、マルチプラットフォームビルド |
| `ch10-cicd/` | Ch10 | GitHub Actions、`--wait`、CI/CD パイプライン |
| `ch11-deploy/` | Ch11 | Cloud Run / Fly.io / Bridge to Kubernetes |
| `ch12-cases/` | Ch12 | 業務シーン 20 ケース(PostgreSQL / Redis / Mailhog / Traefik 等) |

## ライセンス

MIT License(`LICENSE` 参照、後日追加予定)。

書籍本体の著作権は著者(森川 陽介)に帰属しますが、本リポジトリのサンプルコードは自由に学習・改変・流用していただいて構いません。
