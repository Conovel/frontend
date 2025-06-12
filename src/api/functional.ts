export const withAuth = async <T>(
  fn: () => Promise<T>,
  onAuthFailure: () => Promise<void> = async () => { await logout(); },
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
      throw error; // 認証エラー以外はそのまま投げる
    }
  }
};
