import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 一応ログに現在のmodeを出力しておく
  console.log(`Vite is running in mode: ${mode}`);

  return {
    plugins: [react()],
    server: {
      host: true, // 外部からのアクセスを許可
      port: 3000,
      watch: {
        usePolling: mode === "development",
      },
    },
  };
});
