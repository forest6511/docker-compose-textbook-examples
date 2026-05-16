# 02-include

`include:` トップキーで複数の compose ファイルを **1 アプリケーションモデルとして取り込む** サンプル。

## ファイル構成

- `compose.yaml` — トップレベル(include: のみ)
- `shared/compose.yaml` — 共有基盤(db + cache)
- `services/web.yaml` — アプリ層(web、db / cache に depends_on)

## 動作確認

```bash
docker compose config
```

→ 3 ファイルすべての services / networks / volumes が 1 つにマージされた結果が表示される。

起動:

```bash
docker compose up -d
docker compose ps
```

クリーンアップ:

```bash
docker compose down
```

## include の特徴

- include 先の **相対パスは include 先のディレクトリから解決**(extends より直感的)
- include 先が **さらに include を持つと再帰的に辿る**
- リソース名衝突は **静かに最初勝ち**(警告は出ない、後発は黙って無視)
