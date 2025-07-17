import { http, HttpResponse } from 'msw';
import { PostSentence } from '../../../api/api';
import { Sentence } from '../../../types/types';
import { initialSampleSentence } from './data';

// サーバー側で一元管理する文データ
let sentences: Sentence[] = [initialSampleSentence];

let nextSentenceId = 2;

export const novelViewHandlers = [
  // 文を投稿するハンドラー
  http.post('/v1/sentences', async ({ request }) => {
    const data = (await request.json()) as PostSentence;
    const newSentence: Sentence = {
      ...sentences[0],
      sentence_id: nextSentenceId++,
      sentence: data.sentence || '',
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
