import { http, HttpResponse } from 'msw';
import { NovelListItem } from '../../../api/api';
import { PostSentence } from '../../../types/types';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const novelListHandlers = [
  // 小説一覧取得APIモック
  http.get(`${apiBaseUrl}/novels`, () => {
    const response: NovelListItem[] = [
      {
        title_id: 1,
        title: 'サンプル小説1',
        famous_sentence_text: 'これはサンプル小説1の名言です。',
        author_user_id: 1,
        author_user_name: '作者1',
        profile_icon_image: '/path/to/avatar1.jpg',
        title_genres: ['ファンタジー', '冒険'],
        is_new: true,
        is_famous: true,
        view_count: 100,
        evaluation_good_count: 50,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        title_id: 2,
        title: 'サンプル小説2',
        famous_sentence_text: 'これはサンプル小説2の名言です。',
        author_user_id: 2,
        author_user_name: '作者2',
        profile_icon_image: '/path/to/avatar2.jpg',
        title_genres: ['SF', 'アクション'],
        is_new: true,
        is_famous: false,
        view_count: 50,
        evaluation_good_count: 25,
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
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
