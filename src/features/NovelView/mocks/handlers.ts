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
      sentenceId: nextSentenceId++,
      sentence: data.sentence || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    sentences.unshift(newSentence);
    return HttpResponse.json({ main: newSentence }, { status: 201 });
  }),

  // 文を取得するハンドラー（GET sentenceId指定）
  http.get('/v1/sentences/:sentenceId', ({ params }) => {
    const { sentenceId } = params;
    const found = sentences.find((s) => s.sentenceId === Number(sentenceId));
    return HttpResponse.json(found ?? sentences[0]);
  }),
];
