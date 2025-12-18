import { http, HttpResponse } from 'msw';
import { mockUserData, mockUsersMeError } from './data';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const accountSettingsHandlers = [
  // 正常系
  http.get(`${apiBaseUrl}/users/me`, () => {
    return HttpResponse.json(mockUserData);
  }),

  // エラー系
  http.get(`${apiBaseUrl}/users/me/error`, () => {
    return HttpResponse.json(mockUsersMeError, { status: 404 });
  }),
];
