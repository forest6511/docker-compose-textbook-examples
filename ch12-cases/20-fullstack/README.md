# Ch12 ケース 20: フルスタック開発環境(合わせ技)

本書 Ch12 最終ケース。app + db + cache + mail + DB UI が一発で揃う dev 環境。

## 起動と確認

```bash
docker compose up --wait     # Ch10: 全サービスの起動完了まで待つ
open http://localhost:8081   # Adminer で db に接続
open http://localhost:8025   # Mailhog UI
```

## 設計のポイント

- `depends_on` で 3 種類の condition (`service_healthy` / `service_started`) を使い分ける
- `compose up --wait` で全サービスが ready になるまでブロック、シェル復帰時には全部使える
- 本番では `compose.yaml` + `compose.prod.yaml` の `-f` 合成で差し替え(Ch07)、`cache` の `--requirepass` は secret から渡す
- 新メンバーが入ったら `git clone && docker compose up --wait` の 2 コマンドで dev 環境完成
