import { useApiQuery } from '../useApiQuery';
import { apiService } from '../../services/api';
import { ApiConverters } from '../../services/api/converters';

export function useCurrentUser() {
  return useApiQuery(
    async () => {
      const response = await apiService.users.getUserByMe();
      return ApiConverters.toSafeUser(response?.data || {});
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  );
}

export function useUserById(userId: string, enabled = true) {
  return useApiQuery(
    async () => {
      const id = parseInt(userId, 10);
      const response = await apiService.users.getUserById(id);
      return ApiConverters.toSafeUser(response?.data || {});
    },
    {
      enabled: enabled && !!userId,
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  );
}

// ユーザー更新機能（APIに該当メソッドがないためコメントアウト）
// export function useUpdateUser() {
//   return useApiMutation(
//     async ({ userId, request }: { userId: string; request: UpdateUser }) => {
//       throw new Error('Not implemented');
//     }
//   );
// }

export function useUserNovels(userId: string, enabled = true) {
  return useApiQuery(
    async () => {
      const id = parseInt(userId, 10);
      const response = await apiService.users.getNovelsByUserId(id);
      return ApiConverters.toSafeNovelList(response.data);
    },
    {
      enabled: enabled && !!userId,
      fallbackData: [],
      staleTime: 60000, // 1 minute
    },
  );
}
