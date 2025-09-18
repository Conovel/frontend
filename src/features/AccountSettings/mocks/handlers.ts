import { http, HttpResponse } from 'msw';
import { mockUserData } from './data';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
console.log('MSW API Base URL:', apiBaseUrl);

export const accountSettingsHandlers = [
  // ユーザー情報取得のハンドラー
  http.get(`${apiBaseUrl}/v1/users/me`, () => {
    console.log('MSW: Handling GET /v1/users/me request');
    return HttpResponse.json(mockUserData);
  }),

  // バックエンド動作確認用（一時的に無効化する場合）
  // http.get(`${apiBaseUrl}/v1/users/me---`, () => {
  //   console.log('MSW: Handling GET /v1/users/me--- request (disabled)');
  //   return HttpResponse.json(fallbackUserData);
  // }),
];
