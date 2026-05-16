# Ch12 ケース 6: Mailhog で SMTP テスト

本書 Ch12 ケース 6 の compose.yaml サンプル。

## 起動と確認

```bash
docker compose up -d
# アプリから smtp://mailhog:1025 にメール送信
open http://localhost:8025
```

## 設計のポイント

- SMTP 1025 / Web UI 8025 が Mailhog の公式ポート
- アプリ側は `SMTP_HOST=mailhog SMTP_PORT=1025 SMTP_AUTH=false` 等を環境変数で渡す
- Mailhog は 2020 以降開発停止。後継 `axllent/mailpit` も同じ感覚で使える
