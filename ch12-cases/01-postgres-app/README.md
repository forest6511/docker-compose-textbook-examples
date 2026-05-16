# Ch12 ケース 1: PostgreSQL + アプリのローカル開発環境

本書 Ch12 ケース 1 の compose.yaml サンプル。

## 起動と確認

```bash
docker compose up -d
docker compose exec db psql -U app -d app -c "SELECT version();"
docker compose down -v
```

## 設計のポイント

- `depends_on` long-form + `condition: service_healthy` で PostgreSQL の準備完了を待つ
- `db_data` 名前付き volume でコンテナ削除後もデータを保持
- `change-me` は dev 専用、本番は Ch08 secrets に置き換える
