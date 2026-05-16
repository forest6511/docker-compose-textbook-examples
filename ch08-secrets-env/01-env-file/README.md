# 01-env-file

`.env` と `--env-file` を使い分けるサンプル。

## 試す

```bash
# .env を自動ロード(プロジェクトディレクトリ直下)
docker compose config

# --env-file で別ファイルに切替
docker compose --env-file ./.env.staging config

# 必須変数を未指定で落とす
DB_HOST= docker compose config  # → エラー: DB_HOST is required
```
