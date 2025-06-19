import { http, HttpResponse } from 'msw';
import { PostSentence, Sentence } from '../../../types/types';

// サーバー側で一元管理する文データ
let sentences: Sentence[] = [
  {
    title_id: 1,
    sentence_id: 1,
    sentence: 'これは取得したサンプル文です',
    profile_icon_image: '/path/to/avatar.jpg',
    evaluation_good_count: 10,
    evaluation_stay_count: 2,
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
    title: '',
    main_copy: '',
    overview: '',
    popular: false,
    newArrival: false,
    author_user_name: '',
    chips: [],
    tags: [],
    reader_count: 0,
    avatar: { src: '', alt: '', color: '', text: '' },
    sentence_user_count: 0,
    sentence_hierarchy_count: 0,
    textIndex: 0,
    userId: 0,
    userName: '',
  },
];

let nextSentenceId = 2;

export const novelViewHandlers = [
  // 文を投稿するハンドラー
  http.post('/v1/sentences', async ({ request }) => {
    const data = (await request.json()) as PostSentence;
    const newSentence: Sentence = {
      ...sentences[0],
      sentence_id: nextSentenceId++,
      sentence: data.sentence,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    sentences.unshift(newSentence);
    return HttpResponse.json({ main: newSentence }, { status: 201 });
  }),

  // 文を取得するハンドラー（GET sentence_id指定）
  http.get('/v1/sentences/:sentence_id', ({ params }) => {
    const { sentence_id } = params;
    const found = sentences.find((s) => s.sentence_id === Number(sentence_id));
    return HttpResponse.json(found ?? sentences[0]);
  }),
];
