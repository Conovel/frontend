import { useState, useCallback, useRef } from 'react';
import { ApiErrorHandler, ApiError } from '../services/api/error-handler';

interface UseApiMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: ApiError, variables: TVariables) => void;
  onSettled?: (
    data: TData | undefined,
    error: ApiError | null,
    variables: TVariables,
  ) => void;
}

export interface UseApiMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | null;
  loading: boolean;
  error: ApiError | null;
  reset: () => void;
}

export function useApiMutation<TData = unknown, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseApiMutationOptions<TData, TVariables> = {},
): UseApiMutationResult<TData, TVariables> {
  const { onSuccess, onError, onSettled } = options;

  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutateAsync = useCallback(
    async (variables: TVariables): Promise<TData> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);

        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Request was aborted');
        }

        setData(result);
        onSuccess?.(result, variables);
        onSettled?.(result, null, variables);
        return result;
      } catch (err) {
        const apiError = ApiErrorHandler.handle(err);

        if (!abortControllerRef.current?.signal.aborted) {
          setError(apiError);
          onError?.(apiError, variables);
          onSettled?.(undefined, apiError, variables);
        }

        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn, onSuccess, onError, onSettled],
  );

  const mutate = useCallback(
    (variables: TVariables) => {
      mutateAsync(variables).catch(() => {
        // Error is already handled in mutateAsync
      });
    },
    [mutateAsync],
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    mutate,
    mutateAsync,
    data,
    loading,
    error,
    reset,
  };
}
