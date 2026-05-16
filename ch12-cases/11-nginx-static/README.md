# Ch12 ケース 11: Nginx で静的サイト配信

本書 Ch12 ケース 11 の compose.yaml サンプル。

## 起動と確認

```bash
mkdir -p public && echo "<h1>Hello</h1>" > public/index.html
docker compose up -d
curl http://localhost:8080/
```

## 設計のポイント

- `:ro` で読み込み専用マウント、nginx が誤って書き込まない
- `/usr/share/nginx/html` が nginx のデフォルト document root
- SPA は `try_files $uri /index.html;` を nginx.conf に書いて history mode に対応
