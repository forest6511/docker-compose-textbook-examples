# 01-buildx-cli

`docker buildx build --platform A,B --load` の最小例。
Go の cross-compile を使って QEMU emulation を回避する。

## 試す

```bash
# 2 アーキ同時ビルド + local image store に load
docker buildx build --platform linux/amd64,linux/arm64 \
  -t ch09-buildx-cli:multi --load .

# 両アーキで run できることを確認
docker run --rm --platform linux/amd64 ch09-buildx-cli:multi
docker run --rm --platform linux/arm64 ch09-buildx-cli:multi

# build 情報を見る
docker run --rm --platform linux/amd64 \
  --entrypoint cat ch09-buildx-cli:multi /info.txt

# cleanup
docker rmi ch09-buildx-cli:multi
```

## 前提

- Docker Desktop 4.50+(containerd snapshotter 既定 ON)= multi-platform `--load` 可
- それ以前の Engine: `docker buildx create --driver docker-container --use` で builder 作成が必要
