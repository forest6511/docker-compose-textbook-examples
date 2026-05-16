# 03-extends

`extends` でサービス定義を派生する 2 パターン:

1. **同一ファイル内 extends** — 1 つの `compose.yaml` の中で base / dev / prod を派生
2. **別ファイル extends** — `base-services.yaml` を `compose.split.yaml` から参照

## ファイル構成

- `compose.yaml` — 同一ファイル内 extends 版(web-base, web-dev, web-prod)
- `base-services.yaml` — 外部参照用の base 定義
- `compose.split.yaml` — base-services.yaml を `extends.file` で参照

## 同一ファイル内 extends の動作確認

```bash
docker compose config
```

`web-dev` と `web-prod` がそれぞれ `web-base` の environment を継承し、LOG_LEVEL のみ override されているのが確認できる。

起動するのは派生サービスだけ(`web-base` は実体として動かす必要がないのでスキップ):

```bash
docker compose up -d web-dev web-prod
docker compose ps
```

クリーンアップ:

```bash
docker compose down
```

## 別ファイル extends の動作確認

```bash
docker compose -f compose.split.yaml config
```

`base-services.yaml` の `web-base` を `web-dev` が継承し、LOG_LEVEL のみ override される。

## extends の注意点

- `volumes` / `networks` / `configs` / `secrets` / `links` / `volumes_from` は **自動 import されない**(リソースは extending 側の compose.yaml で改めて宣言する責任)
- **循環参照(A extends B / B extends A)は Compose がエラーで停止**
- `docker stack deploy` では extends は利用不可
- 評価順: `extends` は parse 段階で先に解決され、その後 `-f` 複数指定の merge が走る
