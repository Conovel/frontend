type LoginStatus = 'idle' | 'checking' | 'failure';
export declare const subscribeToAuthStatus: (
  callback: (status: LoginStatus) => void,
) => () => void;
export declare const withAuth: <T>(
  fn: () => Promise<T>,
  refreshToken: () => Promise<any>,
  onAuthFailure: () => Promise<void>,
  onRefreshFailure?: () => Promise<void>,
) => Promise<T | null | undefined>;
export {};
