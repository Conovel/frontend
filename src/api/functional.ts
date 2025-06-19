export type LoginStatus = 'idle' | 'checking' | 'success' | 'failure';

let loginStatus: LoginStatus = 'idle';
let statusChangeCallbacks: ((status: LoginStatus) => void)[] = [];

export const subscribeToAuthStatus = (callback: (status: LoginStatus) => void) => {
  statusChangeCallbacks.push(callback);
  callback(loginStatus);
  return () => {
    statusChangeCallbacks = statusChangeCallbacks.filter(cb => cb !== callback);
  };
};

const setLoginStatus = (status: LoginStatus) => {
  loginStatus = status;
  statusChangeCallbacks.forEach(callback => callback(status));
};

export const getLoginStatus = (): LoginStatus => loginStatus;

export const withAuth = async <T>(
  fn: () => Promise<T>,
  refreshToken: () => Promise<any>,
  onAuthFailure: () => Promise<void>,
  onRefreshFailure?: () => Promise<void>,
): Promise<T | null> => {
  try {
    const result = await fn();
    setLoginStatus('success');
    return result;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      try {
        setLoginStatus('checking');
        const refreshRes = await refreshToken();
        if (refreshRes.status !== 200) throw new Error('Refresh failed');
        const result = await fn();
        setLoginStatus('success');
        return result;
      } catch (refreshError) {
        setLoginStatus('failure');
        await onAuthFailure();
        return null;
      }
    } else {
      setLoginStatus('failure');
      if (onRefreshFailure) {
        await onRefreshFailure();
      } else {
        await onAuthFailure();
      }
      return null;
    }
  }
};

export const resetAuthStatus = () => {
  setLoginStatus('idle');
};
