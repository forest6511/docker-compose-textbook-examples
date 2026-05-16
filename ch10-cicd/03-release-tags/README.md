# 03-release-tags

セマンティックバージョンの git tag を push すると、対応する Docker タグが
自動付与されるパターン。

## 使い方

```bash
git tag v1.2.3
git push origin v1.2.3
```

GitHub Actions が `metadata-action` の `type=semver` パターンで
4 つのタグを自動生成して push する:

- `ghcr.io/<user>/<repo>:1.2.3`
- `ghcr.io/<user>/<repo>:1.2`
- `ghcr.io/<user>/<repo>:1`
- `ghcr.io/<user>/<repo>:latest`

利用者は `docker pull <repo>:1.2` で「1.2 系の最新」を pin できる。
