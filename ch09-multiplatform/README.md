# ch09-multiplatform — マルチプラットフォームビルド(Build Cloud / buildx)

書籍 第 9 章「マルチプラットフォームビルド — Build Cloud / buildx」対応ディレクトリ。

Apple Silicon Mac で開発し、本番は amd64 サーバーで動かすという典型シナリオで踏む QEMU emulation の遅延と、その回避策(cross-compile / Build Cloud)を、ハンズオンで確認できる 3 サンプルを揃えました。

## サンプル一覧

| ディレクトリ | 内容 | 学べること |
|---|---|---|
| `01-buildx-cli/` | `docker buildx build --platform linux/amd64,linux/arm64 --load` の最小例 | Go cross-compile で QEMU emulation を回避する |
| `02-compose-platforms/` | `services.build.platforms:` で compose.yaml に寄せる書き方 | CLI 操作を YAML に寄せると CI でも同じビルド結果になる |
| `03-cross-compile/` | emulation 版と cross-compile 版を並べてビルド時間を比較 | 本書独自計測: emulation 12.642s → cross-compile 3.086s = 約 4 倍速 |

## 試す

```bash
cd 01-buildx-cli
docker buildx ls               # 利用可能 builders を確認
docker buildx build --platform linux/amd64,linux/arm64 -t demo:1.0 .
docker manifest inspect demo:1.0   # multi-arch manifest list が生成されているか
```

> **前提**: Docker Desktop 4.50+ で containerd snapshotter が既定 ON なので、`default` builder のまま `--load` で multi-platform イメージをローカルに取り込めます。古い `docker buildx create --driver docker-container` 手順は不要です(本書 Ch9-1 で詳説)。

## 動作確認環境

- Docker Desktop 4.73.0 (build 226246)
- Docker Buildx v0.33.0-desktop.1
- Docker Engine v29.4.3
- OS: macOS 26 (Apple Silicon arm64)

## 関連章

- 第 3 章: Dockerfile マルチステージビルドの基本(本章の前提)
- 第 10 章: GitHub Actions で `docker buildx` を CI に組み込む
- 第 11 章: マルチプラットフォーム image を Cloud Run / Fly.io へ push する
- 付録 A の A-1-5 / A-6-1 / A-6-2: マルチプラットフォーム周りの落とし穴
