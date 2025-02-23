import { http, HttpResponse } from 'msw';
import { NovelListItem } from '../../../api/api';

const apiBaseUrl = import.meta.env.VITE_DEVELOPMENT_API_BASE_URL;

export const handlers = [
  // 小説一覧取得APIモック
  http.get(`${apiBaseUrl}/novels`, () => {
    const response: NovelListItem[] = [
      {
        title_id: 0,
        title: 'サンプル小説',
        famous_sentence_text: '吾輩は犬である',
        author_user_id: 0,
        author_user_name: '夏目懐石',
        profile_icon_image: '',
        title_genres: ['純文学'],
        is_new: true,
        is_famous: true,
        view_count: 0,
        evaluation_good_count: 0,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
    ];

    return HttpResponse.json(response);
  }),
];
