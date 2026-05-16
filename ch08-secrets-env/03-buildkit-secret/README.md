# 03-buildkit-secret

Dockerfile `RUN --mount=type=secret` を Compose の `build.secrets` から渡すサンプル。
`.npmrc` がイメージレイヤーに残らないことを `docker history` で確認できる。

## 試す

```bash
cp secrets/.npmrc.example secrets/.npmrc
# secrets/.npmrc を編集

docker compose build
docker compose run --rm app

# レイヤーに .npmrc が残らないことを確認
docker history ch08-buildkit-secret:local | head -5
```
