import { http, HttpResponse } from 'msw';
import { NovelListItem } from '../../../api/api';

export const novelListHandlers = [
  // 小説一覧を取得するハンドラー
  http.get(/\/(v1\/)?novels/, () => {
    return HttpResponse.json([
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
        created_at: '2024-03-20T00:00:00Z',
        updated_at: '2024-03-20T00:00:00Z',
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
        created_at: '2024-03-20T00:00:00Z',
        updated_at: '2024-03-20T00:00:00Z',
      },
    ] as NovelListItem[]);
  }),

  // 小説一覧を取得するハンドラー（/novelsエンドポイント用）
  http.get('/novels', () => {
    return HttpResponse.json([
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
        created_at: '2024-03-20T00:00:00Z',
        updated_at: '2024-03-20T00:00:00Z',
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
        created_at: '2024-03-20T00:00:00Z',
        updated_at: '2024-03-20T00:00:00Z',
      },
    ] as NovelListItem[]);
  }),

  // ルートパスのハンドラー
  http.get('/', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
