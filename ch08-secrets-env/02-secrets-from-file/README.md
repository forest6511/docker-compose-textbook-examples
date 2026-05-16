# 02-secrets-from-file

ファイル由来の secret を Postgres に渡すサンプル。
`POSTGRES_PASSWORD_FILE` で `/run/secrets/db_password` を読み込む。

## 試す

```bash
cp secrets/db_password.txt.example secrets/db_password.txt
# secrets/db_password.txt を編集して実パスワードに

docker compose up -d
docker compose ps  # healthy になる

# config 出力に値は出ない(パスのみ)
docker compose config

docker compose down
```
