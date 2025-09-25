import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiErrorHandler, ApiError } from '../services/api/error-handler';

interface UseApiQueryOptions<T> {
  enabled?: boolean;
  fallbackData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  refetchInterval?: number;
  retryCount?: number;
  retryDelay?: number;
  staleTime?: number;
}

export interface UseApiQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  isStale: boolean;
  refetch: () => Promise<void>;
  reset: () => void;
}

export function useApiQuery<T>(
  apiCall: () => Promise<T>,
  options: UseApiQueryOptions<T> = {},
): UseApiQueryResult<T> {
  const {
    enabled = true,
    fallbackData = null,
    onSuccess,
    onError,
    refetchInterval,
    retryCount = 1,
    retryDelay = 1000,
    staleTime = 5 * 60 * 1000, // 5 minutes
  } = options;

  const [data, setData] = useState<T | null>(fallbackData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isStale, setIsStale] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const refetchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const staleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastFetchTimeRef = useRef<number | null>(null);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);
    setIsStale(false);

    let attempts = 0;
    const maxAttempts = retryCount + 1;

    while (attempts < maxAttempts) {
      try {
        const result = await apiCall();

        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        setData(result);
        setError(null);
        lastFetchTimeRef.current = Date.now();
        onSuccess?.(result);

        if (staleTimeoutRef.current) {
          clearTimeout(staleTimeoutRef.current);
        }
        staleTimeoutRef.current = setTimeout(() => {
          setIsStale(true);
        }, staleTime);

        break;
      } catch (err) {
        attempts++;
        const apiError = ApiErrorHandler.handle(err);

        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        if (attempts < maxAttempts && !ApiErrorHandler.isAuthError(err)) {
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelay * attempts),
          );
          continue;
        }

        setError(apiError);
        onError?.(apiError);

        if (fallbackData) {
          setData(fallbackData);
        }
        break;
      }
    }

    setLoading(false);
  }, [
    apiCall,
    fallbackData,
    onSuccess,
    onError,
    retryCount,
    retryDelay,
    staleTime,
  ]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  const reset = useCallback(() => {
    setData(fallbackData);
    setLoading(false);
    setError(null);
    setIsStale(false);
  }, [fallbackData]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  useEffect(() => {
    if (refetchInterval && enabled && !error) {
      refetchIntervalRef.current = setInterval(fetchData, refetchInterval);
    }

    return () => {
      if (refetchIntervalRef.current) {
        clearInterval(refetchIntervalRef.current);
      }
    };
  }, [refetchInterval, enabled, error, fetchData]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (refetchIntervalRef.current) {
        clearInterval(refetchIntervalRef.current);
      }
      if (staleTimeoutRef.current) {
        clearTimeout(staleTimeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    isStale,
    refetch,
    reset,
  };
}
