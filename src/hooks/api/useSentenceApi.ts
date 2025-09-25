import { useApiQuery } from '../useApiQuery';
import { useApiMutation } from '../useApiMutation';
import { apiService } from '../../services/api';
import { ApiConverters, SafeSentence } from '../../services/api/converters';
import { PostSentence } from '../../api';

interface SentenceDetail {
  main: SafeSentence | null;
  parent: SafeSentence | null;
  parallels: SafeSentence[];
  children: SafeSentence[];
}

export function useSentenceDetail(sentenceId: number | string, enabled = true) {
  return useApiQuery(
    async () => {
      const id =
        typeof sentenceId === 'string' ? parseInt(sentenceId, 10) : sentenceId;
      const response = await apiService.sentences.getSentenceById(id);

      const data = (response?.data as any) || {};
      const result: SentenceDetail = {
        main: data.main ? ApiConverters.toSafeSentence(data.main) : null,
        parent: data.parent ? ApiConverters.toSafeSentence(data.parent) : null,
        parallels: data.parallels
          ? data.parallels.map(ApiConverters.toSafeSentence)
          : [],
        children: data.children
          ? data.children.map(ApiConverters.toSafeSentence)
          : [],
      };

      return result;
    },
    {
      enabled: enabled && !!sentenceId,
      staleTime: 30000, // 30 seconds
    },
  );
}

// 小説の文章一覧を取得（APIに該当メソッドがないためコメントアウト）
// export function useSentencesByNovelId(novelId: string, enabled = true) {
//   return useApiQuery(
//     async () => {
//       return [];
//     },
//     {
//       enabled: enabled && !!novelId,
//       fallbackData: [],
//       staleTime: 30000, // 30 seconds
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

// 文章の更新・削除・いいね機能（APIに該当メソッドがないためコメントアウト）
// export function useUpdateSentence() {
//   return useApiMutation(
//     async ({ sentenceId, request }: { sentenceId: string | number; request: any }) => {
//       throw new Error('Not implemented');
//     }
//   );
// }
