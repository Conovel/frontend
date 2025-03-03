import { Configuration } from './api/configuration';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const axiosConfig = new Configuration({
  basePath: apiBaseUrl,
  // apiKey: 'your-api-key', // APIキーが必要な場合は設定
});
