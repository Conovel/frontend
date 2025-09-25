import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 一応ログに現在のmodeを出力しておく
  console.log(`Vite is running in mode: ${mode}`);

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0", // 外部からのアクセスを許可
      port: 3000,
      strictPort: false, // ポートが使用中の場合は次のポートを試す
      watch: {
        usePolling: mode === "development",
      },
    },
  };
});
