import { http, HttpResponse } from 'msw';
import { NovelListItem } from '../../../api/api';
import { PostSentence } from '../../../types/types';

const apiBaseUrl = import.meta.env.VITE_DEVELOPMENT_API_BASE_URL;

export const novelListHandlers = [
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

  // 新しい文章投稿APIモック
  http.post(`${apiBaseUrl}/sentences`, async ({ request }) => {
    const postData = (await request.json()) as PostSentence;
    if (!postData) {
      return new HttpResponse(null, { status: 400 });
    }

    const response = {
      sentence_id: Math.floor(Math.random() * 1000),
      sentence: postData.sentence,
      text: postData.sentence,
      userName: 'Current User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      title: '',
      textIndex: 0,
      main_copy: '',
      overview: '',
      popular: false,
      newArrival: false,
      avatar: {
        src: '',
        alt: '',
        color: '',
        text: '',
      },
      author_user_name: '',
      chips: [],
      tags: [],
      reader_count: 0,
      sentence_user_count: 0,
      sentence_hierarchy_count: 0,
      userId: 0,
      profile_icon_image: '',
      evaluation_good_count: 0,
      evaluation_stay_count: 0,
    };

    return HttpResponse.json(response);
  }),
];
