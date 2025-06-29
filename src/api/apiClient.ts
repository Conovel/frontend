import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const basePath = import.meta.env.VITE_API_BASE_URL;

// Axios インスタンスを作成
const apiClient = axios.create({
  baseURL: basePath, // API のベース URL
});

// レスポンスをキャメルケースに変換
apiClient.interceptors.response.use((response) => {
  if (response.data) {
    response.data = camelcaseKeys(response.data, { deep: true }); // スネークケース → キャメルケース
  }
  return response;
});

// リクエストをスネークケースに変換
apiClient.interceptors.request.use((config) => {
  if (config.data) {
    config.data = snakecaseKeys(config.data); // キャメルケース → スネークケース
  }
  return config;
});

export default apiClient;
