import { http, HttpResponse } from 'msw';
import { PostSentence } from '../../../types/types';

// 投稿IDのカウンター
let nextSentenceId = 1;

export const novelViewHandlers = [
  // 文を投稿するハンドラー
  http.post('/v1/sentences', async ({ request }) => {
    const data = (await request.json()) as PostSentence;
    console.log('Submitted data:', data);

    const currentId = nextSentenceId++;
    return HttpResponse.json(
      {
        main: {
          sentence_id: currentId,
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
];
