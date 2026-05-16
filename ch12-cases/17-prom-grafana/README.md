# Ch12 ケース 17: Prometheus + Grafana(メトリクス可視化)

本書 Ch12 ケース 17 の compose.yaml サンプル。

## 起動と確認

```bash
docker compose up -d
open http://localhost:9090   # Prometheus 自身のメトリクス
open http://localhost:3000   # Grafana (admin / admin)
# Grafana → Data Sources → Add → Prometheus → URL: http://prometheus:9090
```

## 設計のポイント

- `prometheus.yml` をマウントすると設定変更はホスト側ファイル編集 + `restart` で反映
- `grafana_data` でダッシュボード定義や plugin を永続化
- Grafana から Prometheus を参照する URL は `http://prometheus:9090`(サービス名解決)
