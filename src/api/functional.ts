type LoginStatus = 'idle' | 'checking' | 'failure';

let loginStatus: LoginStatus = 'idle';
let statusChangeCallbacks: ((status: LoginStatus) => void)[] = [];

export const subscribeToAuthStatus = (
  callback: (status: LoginStatus) => void,
) => {
  statusChangeCallbacks.push(callback);
  callback(loginStatus);
  return () => {
    statusChangeCallbacks = statusChangeCallbacks.filter(
      (cb) => cb !== callback,
    );
  };
};

const setLoginStatus = (status: LoginStatus) => {
  loginStatus = status;
  statusChangeCallbacks.forEach((callback) => callback(status));
};

const getLoginStatus = (): LoginStatus => loginStatus;

export const withAuth = async <T>(
  fn: () => Promise<T>,
  refreshToken: () => Promise<any>,
  onAuthFailure: () => Promise<void>,
  onRefreshFailure?: () => Promise<void>,
): Promise<T | null | undefined> => {
  try {
    return await fn();
  } catch (error: any) {
    if (error?.response?.status !== 401) throw error;

    // リフレッシュ中の場合は待機
    if (getLoginStatus() === 'checking') {
      console.log('Auth refresh already in progress, waiting...');
      return null;
    }

    setLoginStatus('checking');
    try {
      console.log('Attempting to refresh token...');
      const refreshRes = await refreshToken();
      console.log('Token refresh response:', refreshRes);
      setLoginStatus('idle');

      // リフレッシュ成功後、元の関数を再実行
      try {
        return await fn();
      } catch (retryError) {
        console.error('Retry after refresh failed:', retryError);
        setLoginStatus('failure');
        if (onAuthFailure) await onAuthFailure();
        setLoginStatus('idle');
        return null;
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      setLoginStatus('failure');
      if (onRefreshFailure) await onRefreshFailure();
      setLoginStatus('idle');
      return null;
    }
  }
};
