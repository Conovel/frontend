import { http, HttpResponse } from 'msw';
import { mockUserData, mockUsersMeError } from './data';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/v1';
console.log('MSW API Base URL:', apiBaseUrl);

export const accountSettingsHandlers = [
  // 正常系
  http.get(`${apiBaseUrl}/v1/users/me`, () => {
    return HttpResponse.json(mockUserData);
  }),

  // エラー系
  http.get(`${apiBaseUrl}/v1/users/me/error`, () => {
    return HttpResponse.json(mockUsersMeError, { status: 404 });
  }),
];
