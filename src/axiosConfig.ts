import { Configuration } from './api/configuration';

const basePath = import.meta.env.VITE_API_BASE_URL;

// モック環境での認証トークン設定
const getAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  return token || '';
};

export const axiosConfig = new Configuration({
  basePath,
  accessToken: getAuthToken,
  // クッキーを使用して認証情報を送信
  baseOptions: {
    withCredentials: true,
  },
});
