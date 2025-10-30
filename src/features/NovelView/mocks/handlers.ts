import { http, HttpResponse } from 'msw';
import {
  PostSentence,
  EvaluateSentence,
  Sentence,
  ViewMeUser,
} from '../../../api/api';
import { initialSampleSentence } from './data';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3001/v1';

// サーバー側で一元管理する文データ
let sentences: Sentence[] = [initialSampleSentence];

let nextSentenceId = 2;

// モックユーザー情報
const mockUser: ViewMeUser = {
  userId: 1,
  penName: 'テストユーザー',
  nickName: 'テスト',
  profileIconImage: '/path/to/avatar.jpg',
  evaluationGoodCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  birthYm: '1990/01',
  isAnonymous: false,
  agreedTermsVersion: 1,
};

export const novelViewHandlers = [
  // 文を投稿するハンドラー
  http.post(`${apiBaseUrl}/sentences`, async ({ request }) => {
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
  http.get(`${apiBaseUrl}/sentences/:sentenceId`, ({ params }) => {
    const { sentenceId } = params;
    const found = sentences.find((s) => s.sentenceId === Number(sentenceId));

    if (found) {
      // childrenデータを追加（モックデータ）
      const response = {
        ...found,
        children: [
          {
            sentenceId: (found.sentenceId || 0) + 100,
            sentence:
              'これは子投稿のサンプルテキストです。評価後に表示されます。',
            sentenceUserId: 2,
            sentencePenName: '子投稿ユーザー',
            profileIconImage: '/path/to/child-avatar.jpg',
            evaluationGoodCount: 3,
            evaluationStayCount: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            sentenceId: (found.sentenceId || 0) + 101,
            sentence: 'もう一つの子投稿です。複数の続きを読むことができます。',
            sentenceUserId: 3,
            sentencePenName: '別のユーザー',
            profileIconImage: '/path/to/another-avatar.jpg',
            evaluationGoodCount: 5,
            evaluationStayCount: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      };
      return HttpResponse.json(response);
    }

    return HttpResponse.json(sentences[0]);
  }),

  // 評価APIハンドラー
  http.post(`${apiBaseUrl}/evaluations`, async ({ request }) => {
    const data = (await request.json()) as EvaluateSentence;

    // 評価を処理（実際の実装ではデータベースに保存）
    const mockEvaluation = {
      evaluationId: Math.floor(Math.random() * 10000) + 1000,
      sentenceId: data.sentenceId,
      evaluation: data.evaluation,
      userId: mockUser.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 評価後にchildrenデータを取得できるようにする

    return HttpResponse.json(mockEvaluation, { status: 201 });
  }),

  // ユーザー情報取得APIハンドラー
  http.get(`${apiBaseUrl}/users/me`, () => {
    return HttpResponse.json(mockUser, { status: 200 });
  }),

  // 認証トークンリフレッシュAPIハンドラー
  http.post(`${apiBaseUrl}/auth/refresh`, () => {
    // OpenAPI (conovel-openapi.yml) の仕様に合わせて空レスポンスを返す
    return new HttpResponse(null, { status: 200 });
  }),
];
