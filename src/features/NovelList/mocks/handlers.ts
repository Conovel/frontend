import { http, HttpResponse } from 'msw';
import { NovelListItem, PostSentence } from '../../../api/api';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const novelListHandlers = [
  // 小説一覧取得APIモック
  http.get(`${apiBaseUrl}/novels`, () => {
    const response: NovelListItem[] = [
      {
        titleId: 1,
        title: 'サンプル小説1',
        famousSentenceText: 'これはサンプル小説1の名言です。',
        authorUserId: 1,
        authorPenName: '作者1',
        profileIconImage: '/path/to/avatar1.jpg',
        titleGenres: ['ファンタジー', '冒険'],
        isNew: true,
        isFamous: true,
        viewCount: 100,
        evaluationGoodCount: 50,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        titleId: 2,
        title: 'サンプル小説2',
        famousSentenceText: 'これはサンプル小説2の名言です。',
        authorUserId: 2,
        authorPenName: '作者2',
        profileIconImage: '/path/to/avatar2.jpg',
        titleGenres: ['SF', 'アクション'],
        isNew: true,
        isFamous: false,
        viewCount: 50,
        evaluationGoodCount: 25,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ];

    return HttpResponse.json(response);
  }),

  // 新しい文章投稿APIモック
  http.post(`${apiBaseUrl}/sentences`, async ({ request }) => {
    try {
      const postData = (await request.json()) as PostSentence;
      console.log('投稿されたデータ:', postData);

      // 成功レスポンスを返す
      return new HttpResponse(null, { status: 201 });
    } catch (error) {
      console.error('エラーが発生しました:', error);
      return new HttpResponse(null, { status: 500 });
    }
  }),
];
