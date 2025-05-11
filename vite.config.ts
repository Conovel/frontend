import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 一応ログに現在のmodeを出力しておく
  console.log(`Vite is running in mode: ${mode}`);

  return {
    plugins: [react()],
    server: {
      watch: {
        usePolling: mode === "development",
      },
      host: true, // Docker環境で必要
      proxy: {
        "/v1": {
          target: "http://localhost:3001", // Docker環境外からのアクセス用
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/v1/, "/v1"),
        },
      },
    },
  };
});
