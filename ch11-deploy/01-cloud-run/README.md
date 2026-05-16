# 01-cloud-run

Cloud Run に Docker イメージをデプロイする最小構成。
Go の HTTP サーバが `PORT` env を読んで listen するだけのサンプル。

## ローカル確認

```bash
docker build -t ch11-cloudrun-test .
docker run --rm -p 8080:8080 -e PORT=8080 ch11-cloudrun-test
curl http://localhost:8080/
# → Hello from Cloud Run on port 8080
```

## Cloud Run デプロイ

`deploy.sh` の `YOUR_GH_USER` を書き換えて実行:

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT
./deploy.sh
```

完了すると `https://ch11-cloud-run-demo-xxx.run.app/` のような URL が返る。

## 必要な前提

- gcloud CLI install + auth 済
- GCP プロジェクト作成 + 課金有効
- Cloud Run API 有効化
- `--image` は public か、Artifact Registry に push 済のものを指定
