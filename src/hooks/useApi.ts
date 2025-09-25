import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiErrorHandler, ApiError } from '../services/api/error-handler';

interface UseApiOptions<T> {
  fallbackData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  retryCount?: number;
  retryDelay?: number;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  execute: (...args: unknown[]) => Promise<void>;
  reset: () => void;
}

export function useApi<T>(
  apiCall: (...args: unknown[]) => Promise<T>,
  options: UseApiOptions<T> = {},
): UseApiResult<T> {
  const {
    fallbackData = null,
    onSuccess,
    onError,
    retryCount = 0,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState<T | null>(fallbackData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const execute = useCallback(
    async (...args: unknown[]) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);

      let attempts = 0;
      const maxAttempts = retryCount + 1;

      while (attempts < maxAttempts) {
        try {
          const result = await apiCall(...args);

          if (abortControllerRef.current?.signal.aborted) {
            return;
          }

          setData(result);
          setError(null);
          onSuccess?.(result);
          break;
        } catch (err) {
          attempts++;
          const apiError = ApiErrorHandler.handle(err);

          if (abortControllerRef.current?.signal.aborted) {
            return;
          }

          if (attempts < maxAttempts && !ApiErrorHandler.isAuthError(err)) {
            await new Promise((resolve) => {
              retryTimeoutRef.current = setTimeout(
                resolve,
                retryDelay * attempts,
              );
            });
            continue;
          }

          setError(apiError);
          onError?.(apiError);

          if (fallbackData) {
            setData(fallbackData);
          }
          break;
        } finally {
          if (attempts === maxAttempts) {
            setLoading(false);
          }
        }
      }

      setLoading(false);
    },
    [apiCall, fallbackData, onSuccess, onError, retryCount, retryDelay],
  );

  const reset = useCallback(() => {
    setData(fallbackData);
    setLoading(false);
    setError(null);
  }, [fallbackData]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}
