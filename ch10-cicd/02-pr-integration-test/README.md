# 02-pr-integration-test

PR で「ビルドだけして compose で統合テストを回す」パターン。

## ローカルで試す

```bash
docker compose build
docker compose up --abort-on-container-exit --exit-code-from app
echo $?  # 0 ならテスト成功
docker compose down -v
```

## GitHub Actions

`workflows-examples/pr.yml` を `.github/workflows/pr.yml` にコピー。
PR を作ると自動で:
1. `docker compose build` でローカルにイメージ作成
2. `docker compose up --exit-code-from app` で integration test 実行
3. app の exit code が job の exit code に
4. 失敗時のみ `docker compose logs` を吐く

push されないので ghcr.io / Docker Hub には何も上がらない。
