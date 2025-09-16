import { Configuration } from './api/configuration';

const basePath = import.meta.env.VITE_API_BASE_URL;

// モック環境での認証トークン設定
const getAuthToken = () => {
  // 開発環境では認証をスキップ（バックエンドで認証をスキップするため）
  if (import.meta.env.DEV) {
    return ''; // 空文字を返す
  }
  // 本番環境では実際のトークンを取得
  return localStorage.getItem('accessToken') || '';
};

export const axiosConfig = new Configuration({
  basePath,
  accessToken: getAuthToken,
  // クッキーを使用して認証情報を送信
  baseOptions: {
    withCredentials: true,
  },
});
