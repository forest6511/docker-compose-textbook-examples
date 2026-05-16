# ch07-multi-compose — 環境別構成と複数 Compose ファイル合成

書籍 第 7 章「環境別構成と複数 Compose ファイル合成」対応ディレクトリ。

開発・ステージング・本番で compose.yaml の一部だけを差し替えたい場面で使う 3 つの典型パターンを揃えました。`-f` 複数指定 / `include:` / `extends` の挙動と落とし穴をハンズオンで確認できます。

## サンプル一覧

| ディレクトリ | 内容 | 学べること |
|---|---|---|
| `01-base-override/` | `-f base.yaml -f override.yaml` の merge + `compose.override.yaml` の暗黙ロード | 同名サービスの merge ルール / `-f` が `COMPOSE_FILE` を完全上書きする挙動 |
| `02-include/` | `include:` トップキーで複数ファイルを 1 アプリケーションモデルとして取り込む | リソース名衝突は警告ではなく**静かに最初勝ち**(本書独自検証) |
| `03-extends/` | 同一ファイル内 extends と外部ファイル extends の 2 パターン | `volumes` `networks` 等のリソース参照は自動 import されない罠 |

## 試す

各サブディレクトリに移動して個別の README を読んでください。

```bash
cd 01-base-override
docker compose -f compose.yaml -f compose.dev.yaml up -d
docker compose -f compose.yaml -f compose.dev.yaml down -v
```

## 動作確認環境

- Docker Desktop 4.73.0 (build 226246)
- Docker Compose v5.1.3 (Desktop 同梱)
- Docker Engine v29.4.3
- OS: macOS 26 (Apple Silicon arm64)

新しい安定版でも動作する想定です。

## 関連章

- 第 5 章: `depends_on` long-form と `profiles:` の使い分け(本章で前提となる)
- 第 8 章: `secrets:` を本番側 compose ファイルだけに足す合成パターン
- 付録 A の A-2-4 / A-2-5 / A-2-6: extends / include で踏みやすい落とし穴のトラブルシュート
