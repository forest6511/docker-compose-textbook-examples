# Ch06: docker compose watch サンプル

第 6 章「docker compose watch で開発フローを変える」で扱う 4 つのサンプルです。

## 動作要件

- Docker Desktop 4.73+ または Docker Engine v29.4+
- Docker Compose v5.1.3 同等以上(v2.32+ なら全 action 利用可)

## サンプル一覧

### 01-node-sync

Express + nodemon。`src/` 編集は **sync**、`package.json` 変更は **rebuild**。

```bash
cd 01-node-sync
docker compose up -d --build
docker compose watch --no-up
# 別ターミナルで api/src/server.js を編集 → 即時反映
curl http://localhost:3000/
```

### 02-go-rebuild

Go バイナリの開発。`.go` を含む全ソースを **rebuild** で対応。BuildKit cache mounts が
効くので 2 回目以降の rebuild は約 1.5 秒。

```bash
cd 02-go-rebuild
docker compose up -d --build
docker compose watch --no-up
# 別ターミナルで app/main.go を編集 → 再ビルドされて反映
curl http://localhost:8080/
```

### 03-nginx-restart

nginx 設定変更を **sync+restart** で反映。`nginx.conf` を編集すると
コンテナにファイル同期 → nginx コンテナを restart。

```bash
cd 03-nginx-restart
docker compose up -d --build
docker compose watch --no-up
# 別ターミナルで web/nginx.conf を編集 → コンテナ restart
curl -I http://localhost:8081/
```

### 04-sync-exec

`schema.txt` の変更を契機にコンテナ内で **sync+exec** でコードジェネレータを実行。
Prisma の `prisma generate` 相当を最小再現したもの。

```bash
cd 04-sync-exec
docker compose up -d --build
docker compose watch --no-up
# 別ターミナルで api/schema.txt を編集 → regen.js が exec で走る
curl http://localhost:3001/schema
```

## macOS / Windows 上の注意

watch は **コピーベースの同期** なので、`volumes:` で bind mount を張る必要はありません。
bind mount + inotify が macOS / Windows で遅い・反応しないという既知の問題から開放されます。
本サンプルでは bind mount を一切使っていません。

## ログサンプル

各サブディレクトリの `watch-output.txt` に、ファイル編集時の watch 実機ログを保存してあります。
書籍本文のターミナル出力はこのログから引用しています。
