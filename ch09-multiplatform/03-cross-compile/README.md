# 03-cross-compile

emulation 版と cross-compile 版を並べて build 時間を比較。

## 試す

```bash
# emulation 版(QEMU で arm64 ホストが amd64 を実行)
time docker buildx build -f Dockerfile.emulation \
  --platform linux/amd64,linux/arm64 \
  -t ch09-emulation:multi --load .

# cross-compile 版($BUILDPLATFORM で native ビルド)
time docker buildx build -f Dockerfile.crosscompile \
  --platform linux/amd64,linux/arm64 \
  -t ch09-crosscompile:multi --load .

# cleanup
docker rmi ch09-emulation:multi ch09-crosscompile:multi
```

Go / Rust / Node など cross-compile が effective な言語ではこの差が劇的。
