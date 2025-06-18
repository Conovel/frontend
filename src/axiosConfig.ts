import { Configuration } from './api/configuration';

const basePath = import.meta.env.VITE_API_BASE_URL;

export const axiosConfig = new Configuration({
  basePath,
  // baseOptions: {
  //   withCredentials: true,
  // }, // 全てのリクエストにwithCredentialsを適用する場合はコメントアウトを外す
  // apiKey: 'your-api-key', // APIキーが必要な場合は設定
});
