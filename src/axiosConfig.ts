import { Configuration } from './api/configuration';

const basePath = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3000';

export const axiosConfig = new Configuration({
  basePath,
  // apiKey: 'your-api-key', // APIキーが必要な場合は設定
});
