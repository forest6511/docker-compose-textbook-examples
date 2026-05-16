# 02-compose-platforms

Compose `services.build.platforms` で multi-arch build。
CLI の `buildx build --platform ...` を compose に寄せる書き方。

## 試す

```bash
docker compose build

docker run --rm --platform linux/amd64 ch09-compose-platforms:local
docker run --rm --platform linux/arm64 ch09-compose-platforms:local

# cleanup
docker rmi ch09-compose-platforms:local
```
