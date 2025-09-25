import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  statusCode?: number;
  originalError?: unknown;
}

export class ApiErrorHandler {
  static handle(error: unknown): ApiError {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      let message = 'エラーが発生しました';

      switch (statusCode) {
        case 400:
          message = '不正なリクエストです';
          break;
        case 401:
          message = '認証が必要です';
          break;
        case 403:
          message = 'アクセス権限がありません';
          break;
        case 404:
          message = 'データが見つかりません';
          break;
        case 500:
          message = 'サーバーエラーが発生しました';
          break;
        case 503:
          message = 'サービスが一時的に利用できません';
          break;
        default:
          if (error.message === 'Network Error') {
            message = 'ネットワークエラーが発生しました';
          } else if (error.code === 'ECONNABORTED') {
            message = 'リクエストがタイムアウトしました';
          }
      }

      return {
        message,
        statusCode,
        originalError: error,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        originalError: error,
      };
    }

    return {
      message: '予期しないエラーが発生しました',
      originalError: error,
    };
  }

  static isNetworkError(error: unknown): boolean {
    if (error instanceof AxiosError) {
      return error.message === 'Network Error' || error.code === 'ERR_NETWORK';
    }
    return false;
  }

  static isAuthError(error: unknown): boolean {
    if (error instanceof AxiosError) {
      return error.response?.status === 401 || error.response?.status === 403;
    }
    return false;
  }

  static isNotFoundError(error: unknown): boolean {
    if (error instanceof AxiosError) {
      return error.response?.status === 404;
    }
    return false;
  }
}
