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
    if (getLoginStatus() !== 'idle') throw new Error('Refresh not Idle');
    setLoginStatus('checking');
    try {
      const refreshRes = await refreshToken();
      if (refreshRes.status !== 200) throw new Error('Refresh failed');
      setLoginStatus('idle');
    } catch (refreshError) {
      setLoginStatus('failure');
      await onRefreshFailure();
      setLoginStatus('idle');
      return null;
    }
    try {
      const result = await fn();
      return result;
    } catch (refreshError) {
      setLoginStatus('failure');
      await onAuthFailure();
      setLoginStatus('idle');
      return null;
    }
  }
};
