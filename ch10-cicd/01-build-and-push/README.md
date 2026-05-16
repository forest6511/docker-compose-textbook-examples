# 01-build-and-push

GitHub Actions の最小 build & push パターン。

## セットアップ

1. このディレクトリの内容を GitHub repo にコピー
2. `workflows-examples/ci.yml` を `.github/workflows/ci.yml` にリネーム配置
3. `Settings → Actions → General → Workflow permissions` で
   `Read and write permissions` を有効化(ghcr.io への push 用)
4. main にコミット push → GitHub Actions が走る
5. ghcr.io に build & push される

## 必要な secrets

このサンプルは `GITHUB_TOKEN` のみで動く(自動付与、設定不要)。
Docker Hub に push する場合は `DOCKERHUB_USERNAME` `DOCKERHUB_TOKEN` を追加。

## 動作確認

push 後、`https://github.com/<user>/<repo>/pkgs/container/<repo>` で
linux/amd64 + linux/arm64 の manifest list が確認できる。
