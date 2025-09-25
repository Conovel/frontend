import { useApiQuery } from '../useApiQuery';
import { useApiMutation } from '../useApiMutation';
import { apiService } from '../../services/api';
import { ApiConverters } from '../../services/api/converters';
import { PostSentence } from '../../api';

export function useNovelList() {
  return useApiQuery(
    async () => {
      const response = await apiService.novels.getNovels();
      return ApiConverters.toSafeNovelList(response.data);
    },
    {
      fallbackData: [],
      staleTime: 30000, // 30 seconds
    },
  );
}

export function useNovelDetail(novelId: string, enabled = true) {
  return useApiQuery(
    async () => {
      const id = parseInt(novelId, 10);
      const response = await apiService.novels.getNovelById(id);
      return ApiConverters.toSafeNovelDetail(response.data);
    },
    {
      enabled: enabled && !!novelId,
      staleTime: 60000, // 1 minute
    },
  );
}

// 小説の文章一覧を取得するフック（現在のAPIには該当メソッドがないため、コメントアウト）
// export function useNovelSentences(novelId: string, enabled = true) {
//   return useApiQuery(
//     async () => {
//       // APIに該当するメソッドがないため、空配列を返す
//       return [];
//     },
//     {
//       enabled: enabled && !!novelId,
//       fallbackData: [],
//       staleTime: 30000, // 30 seconds
//     }
//   );
// }

// 小説作成・更新・削除のフック（現在のAPIには該当メソッドがないため、コメントアウト）
// export function useCreateNovel() {
//   return useApiMutation(
//     async (request: any) => {
//       // APIに該当するメソッドがないため、実装なし
//       throw new Error('Not implemented');
//     }
//   );
// }

export function useCreateSentence() {
  return useApiMutation(async (request: PostSentence) => {
    const response = await apiService.sentences.postSentence(request);
    if (!response?.data) {
      throw new Error('Invalid response from postSentence');
    }
    return ApiConverters.toSafeViewSentence(response.data);
  });
}

// いいね機能のフック（現在のAPIには該当メソッドがないため、コメントアウト）
// export function useLikeNovel() {
//   return useApiMutation(
//     async (novelId: string) => {
//       // APIに該当するメソッドがないため、実装なし
//       throw new Error('Not implemented');
//     }
//   );
// }
