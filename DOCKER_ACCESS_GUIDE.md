# Docker フロントエンド アクセス解決策

## 問題の状況

- Dockerコンテナ内でViteが正常に起動している
- 内部IP: `http://172.18.0.3:3000/` でアクセス可能
- localhost:3000 でのアクセスに問題がある可能性

## 解決済みの設定

### 1. vite.config.ts の修正

```typescript
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0", // Docker環境でのアクセスを許可
      port: 3000,
      strictPort: true,
      watch: {
        usePolling: mode === "development",
      },
    },
  };
});
```

### 2. Docker Compose設定の最適化

```yaml
frontend:
  container_name: frontend
  build:
    context: .
    dockerfile: builder/frontend/Dockerfile
  ports:
    - "3000:3000"
  command: sh -c "npm install && npm run dev"
```

### 3. Dockerfile の改善

```dockerfile
FROM node:20.16.0-slim

WORKDIR /app
COPY frontend/package.json ./
RUN npm install
RUN npm install -g vite

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

## アクセス方法

### ✅ 確実にアクセスできる方法

1. **Docker内部IP**: `http://172.18.0.3:3000/`
2. **localhost**: `http://localhost:3000/` (Windows環境で問題があれば下記を試す)

### 🛠️ Windows環境での追加対処法

#### A. Docker Desktop設定確認

1. Docker Desktop > Settings > Resources > WSL Integration
2. WSL統合が有効になっているか確認

#### B. Windowsファイアウォール確認

```powershell
# ファイアウォールルールの確認
Get-NetFirewallRule -DisplayName "*Docker*" | Select-Object DisplayName, Enabled

# 必要に応じて例外を追加
New-NetFirewallRule -DisplayName "Docker Frontend" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

#### C. 代替アクセス方法

- `http://127.0.0.1:3000/`
- `http://0.0.0.0:3000/`
- Docker内部IP: `http://172.18.0.3:3000/`

## 確認コマンド

```powershell
# コンテナ状態確認
docker-compose ps

# ログ確認
docker logs frontend

# ポート確認
Test-NetConnection -ComputerName localhost -Port 3000
```

## ブラウザでのアクセス

以下のURLでブラウザアクセスを試してください：

1. `http://localhost:3000/`
2. `http://127.0.0.1:3000/`
3. `http://172.18.0.3:3000/` (Docker内部IP)

通常、1番目のlocalhostで動作するはずですが、Windows環境での問題がある場合は、3番目のDocker内部IPでアクセスできます。
