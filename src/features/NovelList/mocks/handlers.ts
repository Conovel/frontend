import { http, HttpResponse } from 'msw';
import { NovelListItem } from '../../../api/api';
import { PostSentence } from '../../../types/types';

export const novelListHandlers = [
  // 小説一覧を取得するハンドラー
  http.get('/v1/novels', () => {
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

  // 文を投稿するハンドラー
  http.post('/v1/sentences', async ({ request }) => {
    const data = (await request.json()) as PostSentence;
    console.log('Submitted data:', data);

    return HttpResponse.json(
      {
        main: {
          sentence_id: 1,
          sentence: data.sentence,
          sentence_user_id: 1,
          sentence_user_name: 'テストユーザー',
          profile_icon_image: '/path/to/avatar.jpg',
          evaluation_good_count: 0,
          evaluation_stay_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        parent: {
          sentence_id: data.parent_sentence_id,
          sentence: '親投稿のテキスト',
          sentence_user_id: 2,
          sentence_user_name: '親投稿ユーザー',
          profile_icon_image: '/path/to/parent-avatar.jpg',
          evaluation_good_count: 5,
          evaluation_stay_count: 2,
          created_at: new Date().toISOString(),
          updated_at: data.parent_updated_at,
        },
        parallels: [],
        children: [],
      },
      { status: 201 },
    );
  }),

  // ルートパスのハンドラー
  http.get('/', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
