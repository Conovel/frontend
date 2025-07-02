import { http, HttpResponse } from 'msw';
import { NovelListItem, PostSentence, Sentence } from '../../../api/api';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const novelListHandlers = [
  // 小説一覧を取得するハンドラー
  http.get(new RegExp(`^${apiBaseUrl}/(v1/)?novels/?$`), () => {
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
  http.get(new RegExp(`^${apiBaseUrl}/novels/?$`), () => {
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
  http.get(new RegExp(`^${apiBaseUrl}/?$`), () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // 投稿を作成するハンドラー
  http.post(
    new RegExp(`^${apiBaseUrl}/v1/sentences/?$`),
    async ({ request }) => {
      const postData = (await request.json()) as PostSentence;

      // 投稿データのバリデーション
      if (!postData.sentence || postData.sentence.trim() === '') {
        return HttpResponse.json(
          { error: '投稿内容は必須です' },
          { status: 400 },
        );
      }

      if (!postData.parent_sentence_id) {
        return HttpResponse.json(
          { error: '親投稿IDは必須です' },
          { status: 400 },
        );
      }

      // モックの投稿レスポンス
      const newSentence: Sentence = {
        sentence_id: Math.floor(Math.random() * 10000) + 1000, // ランダムなID
        sentence: postData.sentence,
        sentence_user_id: 1, // モックユーザーID
        sentence_user_name: 'モックユーザー',
        profile_icon_image: '/path/to/avatar.jpg',
        evaluation_good_count: 0,
        evaluation_stay_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return HttpResponse.json(newSentence, { status: 201 });
    },
  ),

  // 投稿を作成するハンドラー（/sentencesエンドポイント用）
  http.post(new RegExp(`^${apiBaseUrl}/sentences/?$`), async ({ request }) => {
    const postData = (await request.json()) as PostSentence;

    // 投稿データのバリデーション
    if (!postData.sentence || postData.sentence.trim() === '') {
      return HttpResponse.json(
        { error: '投稿内容は必須です' },
        { status: 400 },
      );
    }

    if (!postData.parent_sentence_id) {
      return HttpResponse.json(
        { error: '親投稿IDは必須です' },
        { status: 400 },
      );
    }

    // モックの投稿レスポンス
    const newSentence: Sentence = {
      sentence_id: Math.floor(Math.random() * 10000) + 1000, // ランダムなID
      sentence: postData.sentence,
      sentence_user_id: 1, // モックユーザーID
      sentence_user_name: 'モックユーザー',
      profile_icon_image: '/path/to/avatar.jpg',
      evaluation_good_count: 0,
      evaluation_stay_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return HttpResponse.json(newSentence, { status: 201 });
  }),
];
