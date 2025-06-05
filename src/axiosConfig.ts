import { Configuration } from './api/configuration';

// 開発環境ではMSWを使用するため、basePathを空にする
const basePath = import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : '';

export const axiosConfig = new Configuration({
  basePath,
  // apiKey: 'your-api-key', // APIキーが必要な場合は設定
});
