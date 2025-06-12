import { AuthApi } from './api';
import { axiosConfig } from '../axiosConfig';

const authApi = new AuthApi(axiosConfig);

export const withAuth = async <T>(
  fn: () => Promise<T>,
  onAuthFailure: () => Promise<void>,
  onRefreshFailure?: () => Promise<void>,
): Promise<T | null> => {
  try {
    return await fn();
  } catch (error: any) {
    // 401 Unauthorized など、認証切れと判断する条件を調整可能
    if (error?.response?.status === 401) {
      try {
        const refreshRes = await authApi.refreshToken({ withCredentials: true });
        if (refreshRes.status !== 200) throw new Error('Refresh failed');

        return await fn(); // 再試行
      } catch (refreshError) {
        await onAuthFailure();
        return null;
      }
    } else {
      if (onRefreshFailure) {
        await onRefreshFailure();
      } else {
        await onAuthFailure();
      }
      return null;
    }
  }
};
