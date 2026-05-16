# Ch12 ケース 13: Traefik でホスト名ベースルーティング

本書 Ch12 ケース 13 の compose.yaml サンプル。

## 起動と確認

```bash
docker compose up -d
curl -H "Host: app1.localhost" http://localhost/
curl -H "Host: app2.localhost" http://localhost/
open http://localhost:8080    # Traefik 管理 UI
```

## 設計のポイント

- `--providers.docker` で Traefik が Docker socket を読み、ラベル付きコンテナを自動登録
- `exposedbydefault=false` で `traefik.enable=true` を明示したコンテナだけ公開
- Docker socket は `:ro` で読み込み専用マウント
- 本番では socket 経由を避け、Kubernetes / Consul プロバイダを使う
