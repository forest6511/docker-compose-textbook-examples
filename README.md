# docker-compose-textbook-examples

書籍『**[Docker Compose の教科書 — 現場で使える基礎から CI/CD・本番デプロイまで](https://www.amazon.co.jp/dp/B0H22MJHXL)**』(森川 陽介・著、Amazon Kindle ¥980 KU) の **動作確認済みサンプルコード集** です。

本書は Docker Compose v2.40+ / Docker Desktop 4.73+ の最新仕様を主軸に、12 章 + 付録 2 で「コピペで動かしている状態」から「自分で構造を組める状態」へ橋渡しする教科書です。本リポジトリは、その全章のサンプルを「`git clone` してすぐ動く」形で揃えたものです。

## はじめに

各章のディレクトリは**完全に独立した最小構成**になっています。書籍を読み進めながら、対応する章のディレクトリで `docker compose up -d` を叩いて手を動かす流れを想定しています。

```bash
git clone https://github.com/forest6511/docker-compose-textbook-examples.git
cd docker-compose-textbook-examples

# 第 4 章のサンプルを動かす
cd ch04-compose-basics/02-web-db
docker compose up -d --build
curl http://localhost:8080/users
docker compose down -v
```

各章の概要・サンプル一覧・実行手順は、各ディレクトリ内の `README.md` を参照してください。

## 前提

- **Docker Desktop 4.73 以降**(Mac / Windows)、または **Docker Engine v29.4 以降 + Docker Compose v2.40 以降**(Linux)
- ネット接続(Docker Hub からのイメージ pull)
- 8080 / 5432 / 3000 / 8025 などのポートが空いていること(各章で利用)

実機検証は次の環境で行いました。これより新しい安定版でも動くはずです。

| ツール | バージョン |
|---|---|
| Docker Desktop | 4.73.0 (build 226246) |
| Docker Engine | v29.4.3 |
| Docker Compose | v5.1.3(`docker compose` CLI、v2.40+ 互換) |
| Docker Buildx | v0.33.0-desktop.1 |
| OS | macOS 26(Apple Silicon arm64) |

## 章別ディレクトリ

| ディレクトリ | 章 | 内容 |
|---|---|---|
| [`ch01-basics/`](./ch01-basics/) | 第 1 章 | Docker / コンテナ基礎、`docker run hello-world` |
| [`ch02-setup/`](./ch02-setup/) | 第 2 章 | Docker Desktop / Engine セットアップ確認 |
| [`ch03-dockerfile/`](./ch03-dockerfile/) | 第 3 章 | Dockerfile、マルチステージビルド、BuildKit cache mounts、非 root 化 |
| [`ch04-compose-basics/`](./ch04-compose-basics/) | 第 4 章 | services / networks / volumes 基本、Web + DB + Redis スタック |
| [`ch05-compose-keys/`](./ch05-compose-keys/) | 第 5 章 | `depends_on` long-form、`healthcheck`、`profiles` |
| [`ch06-compose-watch/`](./ch06-compose-watch/) | 第 6 章 | `docker compose watch`、`develop.watch` の 4 アクション |
| [`ch07-multi-compose/`](./ch07-multi-compose/) | 第 7 章 | `-f` 複数指定 / `include:` / `extends` の合成パターン |
| [`ch08-secrets-env/`](./ch08-secrets-env/) | 第 8 章 | `.env` / `secrets:` / `RUN --mount=type=secret`(12-factor) |
| [`ch09-multiplatform/`](./ch09-multiplatform/) | 第 9 章 | `buildx`、Build Cloud、cross-compile による高速マルチアーチ |
| [`ch10-cicd/`](./ch10-cicd/) | 第 10 章 | GitHub Actions、`--wait`、PR 統合テスト、semver タグ |
| [`ch11-deploy/`](./ch11-deploy/) | 第 11 章 | Cloud Run / Fly.io / `docker compose bridge convert` |
| [`ch12-cases/`](./ch12-cases/) | 第 12 章 | 業務シーン 20 ケースから代表 6 サンプル(PostgreSQL / Redis / Mailhog / Nginx / Traefik / Prometheus + Grafana) |

## 動かない・うまく動かないとき

書籍の **付録 A「トラブルシューティング集 — 30 の症状と対処」** に、本サンプル群で踏みやすい 30 件の罠と対処をまとめてあります。次の 4 つのコマンドが「自己診断ツール」として使えます。

```bash
docker compose config             # compose.yaml が補間後にどう見えるかを確認
docker compose logs --tail=100    # 直近のログを全サービス分まとめて表示
docker system df -v               # ディスクの内訳を確認
docker events                     # daemon のイベントストリームを別ターミナルで監視
```

代表的な詰まりどころ:

- **`port is already allocated`** → `lsof -i :8080` / `netstat -ano | findstr :8080` で占有プロセスを特定(付録 A の A-3-1)
- **`depends_on` を書いたのに DB 接続が `connection refused`** → long-form + `condition: service_healthy` に書き換え(付録 A の A-2-2)
- **bind mount したフォルダがコンテナ内で空に見える(macOS / Windows)** → Docker Desktop の File Sharing 設定を確認(付録 A の A-4-1)
- **`Docker Hub toomanyrequests`** → `docker login` で認証、または GHCR / ECR にミラー(付録 A の A-1-7)

## 各章サンプルの全件動作確認

```bash
# ch04 最小構成
cd ch04-compose-basics/01-minimum && docker compose up -d && curl -fsS http://localhost:8080/ && docker compose down

# ch04 Web + DB
cd ../02-web-db && docker compose up -d --build && curl -fsS http://localhost:8080/healthz && docker compose down -v

# ch12 代表サンプル
cd ../../ch12-cases/01-postgres-app && docker compose up -d && docker compose exec db psql -U app -d app -c "SELECT version();" && docker compose down -v
```

すべてのコマンドが exit 0 で完走することを Docker Desktop 4.73 / macOS arm64 環境で確認しています。Linux / Windows + WSL2 でも動くはずですが、ホスト固有の事情(ファイル共有、ポート占有)が絡む可能性があります。

## フィードバック・誤り報告

本サンプルや書籍本文に誤り・改善案を見つけた場合は、本リポジトリの [Issue](https://github.com/forest6511/docker-compose-textbook-examples/issues) または [Pull Request](https://github.com/forest6511/docker-compose-textbook-examples/pulls) でお知らせください。本書の次の版に反映します。

## ライセンス

サンプルコードは **MIT License** で公開しています。`LICENSE` ファイルは後日追加予定です。

書籍本体の著作権は著者(森川 陽介)に帰属しますが、本リポジトリのサンプルコードは**学習・改変・社内勉強会・商用プロダクトへの転用も含めて自由に**利用してください。書籍内サンプルからの大幅な改変版を公開する際は、`This sample is based on docker-compose-textbook-examples.` のようなクレジット表記があると著者として嬉しいです(必須ではありません)。

## 関連リポジトリ

同著者の教科書シリーズ:

- [`go-textbook-examples`](https://github.com/forest6511/go-textbook-examples) — 『Go の教科書』のサンプル
- [`postgresql-textbook-examples`](https://github.com/forest6511/postgresql-textbook-examples) — 『PostgreSQL の教科書』のサンプル
