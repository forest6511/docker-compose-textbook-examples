# 03-compose-bridge

`docker compose bridge convert` で compose.yaml を Kubernetes manifest に変換する。

## 試す

```bash
# 初回は transformation image が pull される
docker compose bridge convert

# 生成物を確認
find out -type f

# Docker Desktop K8s が有効なら、そのまま apply できる
kubectl config use-context docker-desktop
kubectl apply -k out/overlays/desktop/

# 確認
kubectl get all -n ch11-bridge-demo

# 撤収
kubectl delete -k out/overlays/desktop/
```

## 出力構造

```
out/
├── base/                  # 共通 manifest
│   ├── 0-<project>-namespace.yaml
│   ├── default-network-policy.yaml
│   ├── <service>-deployment.yaml
│   ├── <service>-expose.yaml    # ClusterIP service
│   ├── <service>-service.yaml   # 外部公開 (ports: 指定サービスのみ)
│   └── kustomization.yaml
└── overlays/
    └── desktop/           # Docker Desktop K8s 用 overlay
        ├── <service>-service.yaml
        └── kustomization.yaml
```
