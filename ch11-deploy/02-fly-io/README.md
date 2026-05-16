# 02-fly-io

Fly.io へのデプロイ例。

## ローカル確認

```bash
docker build -t ch11-fly-test .
docker run --rm -p 8080:8080 ch11-fly-test
curl http://localhost:8080/
```

## Fly.io デプロイ

```bash
# flyctl インストール
curl -L https://fly.io/install.sh | sh

# サインアップ + ログイン
fly auth signup    # 初回のみ
fly auth login

# fly launch は対話形式で fly.toml を生成する
# 本サンプルは既に fly.toml がある状態
fly deploy

# 起動確認
fly status
fly open
```

`fly.toml` の `app = "ch11-fly-demo"` は世界的にユニークである必要があるので、
読者環境では別名に変更してから `fly deploy` を打つこと。
