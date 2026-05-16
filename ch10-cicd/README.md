# ch10-cicd — CI/CD で使う Docker(GitHub Actions / --wait)

書籍 第 10 章「CI/CD で使う Docker — GitHub Actions / --wait」対応ディレクトリ。

GitHub Actions で Docker をどう組むかの典型シナリオ 3 つを workflow YAML 付きで揃えました。
**workflow ファイルは `workflows-examples/` 配下に配置**しています(`.github/workflows/` に置くと companion repo 自身の CI が走ってしまうため)。自分の repo に流用するときは `.github/workflows/` にコピーしてください。

## サンプル一覧

| ディレクトリ | 内容 | 学べること |
|---|---|---|
| `01-build-and-push/` | main ブランチ push で Docker Hub / GHCR へ build & push | `docker/build-push-action@v7` + `metadata-action@v6` の基本構成、GHA cache backend |
| `02-pr-integration-test/` | PR で compose を立ち上げて統合テスト、PASS 後に merge | `docker compose up --wait` + `--exit-code-from app` で exit code を CI に返す |
| `03-release-tags/` | git tag `v1.2.3` push で Docker タグ `1.2.3` / `1.2` / `1` / `latest` を自動付与 | `metadata-action@v6` の `type=semver` パターン |

## ローカルで試す(02-pr-integration-test)

```bash
cd 02-pr-integration-test
docker compose up --wait --wait-timeout 120
docker compose logs app
docker compose down -v
```

## 検証済バージョン(2026-05 時点 stable)

- `docker/build-push-action@v7.1.0`
- `docker/metadata-action@v6.0.0`
- `docker/setup-buildx-action@v4.0.0`
- `docker/setup-qemu-action@v4.0.0`
- `docker/login-action@v4.1.0`

すべて 2025-03 の Node 24 化メジャーバンプ済みです。

## 動作確認環境

- Docker Desktop 4.73.0 (build 226246)
- Docker Compose v5.1.3 (Desktop 同梱)
- Docker Engine v29.4.3
- Docker Buildx v0.33.0-desktop.1
- OS: macOS 26 (Apple Silicon arm64)

## 関連章

- 第 5 章: `depends_on` long-form + `healthcheck:`(本章で前提となる)
- 第 9 章: マルチプラットフォームビルド(本章 01-build-and-push で利用)
- 付録 A の A-1-4 / A-2-3 / A-7-1: CI/CD 周りの落とし穴
