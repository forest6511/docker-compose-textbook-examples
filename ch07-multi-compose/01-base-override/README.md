# 01-base-override

`-f` 複数指定による merge と `compose.override.yaml` の暗黙ロードを試すサンプル。

## ファイル構成

- `compose.yaml` — base(web + db、本番安全な値)
- `compose.dev.yaml` — 開発上書き(LOG_LEVEL=debug、ports 9229 追加、DB ポート公開)
- `compose.prod.yaml` — 本番上書き(restart: always、resource limits)
- `compose.override.yaml` — 個人ローカル差分(本物の運用では `.gitignore` 対象に)

## 動作確認

base のみ:

```bash
docker compose -f compose.yaml config
```

base + dev:

```bash
docker compose -f compose.yaml -f compose.dev.yaml config
```

base + prod:

```bash
docker compose -f compose.yaml -f compose.prod.yaml config
```

何も指定しないと暗黙ロード(`compose.yaml` + `compose.override.yaml`):

```bash
docker compose config
```

`-f` を指定したら **暗黙ロードは無効**:

```bash
docker compose -f compose.yaml -f compose.dev.yaml config
# LOCAL_HACK は反映されない(compose.override.yaml が読み込まれない)
```

## クリーンアップ

```bash
docker compose down -v
```
