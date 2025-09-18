import { http, HttpResponse } from 'msw';
import { NovelDetail } from '../../../api/api';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const novelInfoHandlers = [
  // 小説詳細取得APIモック
  http.get(`${apiBaseUrl}/novels/:titleId`, ({ params }) => {
    const { titleId } = params;

    // サンプルデータ
    const response: NovelDetail = {
      titleId: Number(titleId),
      title: `サンプル小説${titleId}`,
      mainCopy: `これは小説${titleId}の紹介文です。`,
      overview: `これは小説${titleId}のあらすじです。主人公が冒険に出て、様々な困難を乗り越えていく物語です。`,
      isFamous: Number(titleId) === 1,
      isNew: true,
      profileIconImage: `/path/to/avatar${titleId}.jpg`,
      authorPenName: `作者${titleId}`,
      titleGenres: ['ファンタジー', '冒険'],
      readerCount: 20 * Number(titleId),
      updatedAt: '2024-01-01T00:00:00Z',
      sentenceUserCount: 5 * Number(titleId),
      sentenceHierarchyCount: 10 * Number(titleId),
      createdAt: '2024-01-01T00:00:00Z',
      authorUserId: Number(titleId),
      evaluationGoodCount: 50 * Number(titleId),
    };

    return HttpResponse.json(response);
  }),
];
