import { http, HttpResponse } from 'msw';
import {
  PostSentence,
  EvaluateSentence,
  Sentence,
  ViewMeUser,
} from '../../../api/api';
import { sentencesData, getMockContainerData, getParallelSentences } from './data';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// サーバー側で一元管理する文データ
// 初期値は持たず、外部から得るsentenceIdでのみデータを返す
let sentences: Sentence[] = [];

let nextSentenceId = Math.max(...Object.keys(sentencesData).map(Number)) + 1;

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
      sentenceId: nextSentenceId++,
      sentence: data.sentence || '',
      sentenceUserId: mockUser.userId ?? 0,
      sentencePenName: mockUser.penName || '',
      profileIconImage: mockUser.profileIconImage || '',
      evaluationGoodCount: 0,
      evaluationStayCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    sentences.unshift(newSentence);
    return HttpResponse.json({ main: newSentence }, { status: 201 });
  }),

  // 文を取得するハンドラー（GET sentenceId指定）
  http.get(`${apiBaseUrl}/sentences/:sentenceId`, ({ params }) => {
    const { sentenceId } = params;
    if (!sentenceId) {
      return new HttpResponse('sentenceId is required', { status: 400 });
    }
    const id = Number(sentenceId);
    if (isNaN(id)) {
      return new HttpResponse('sentenceId must be a number', { status: 400 });
    }
    // main, parent, children, parallelsを取得（mainがなければ404）
    const container = getMockContainerData(id);
    if (!container.main || !container.main[0]) {
      return new HttpResponse('Not found', { status: 404 });
    }
    const main = container.main[0];
    const parent = container.parent[0] || null;
    const children = container.children || [];
    const parallels = getParallelSentences(id) || [];
    const response = {
      main,
      parent,
      children,
      parallels,
    };
    return HttpResponse.json(response);
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
