import { http, HttpResponse } from 'msw';
import {
  PostSentence,
  Sentence,
  EvaluateSentence,
  ViewMeUser,
} from '../../../api/api';
import { mockNovelListData } from './data';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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

export const novelListHandlers = [
  // 小説一覧を取得するハンドラー
  http.get(`${apiBaseUrl}/novels`, () => HttpResponse.json(mockNovelListData)),

  // ルートパスのハンドラー
  http.get(apiBaseUrl, () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // 投稿を作成するハンドラー
  http.post(`${apiBaseUrl}/sentences`, async ({ request }) => {
    const postData = (await request.json()) as PostSentence;

    // 投稿データのバリデーション
    if (!postData.sentence || postData.sentence.trim() === '') {
      return HttpResponse.json(
        { error: '投稿内容は必須です' },
        { status: 400 },
      );
    }

    if (!postData.parentSentenceId) {
      return HttpResponse.json(
        { error: '親投稿IDは必須です' },
        { status: 400 },
      );
    }

    // モックの投稿レスポンス
    const newSentence: Sentence = {
      sentenceId: Math.floor(Math.random() * 10000) + 1000, // ランダムなID
      sentence: postData.sentence,
      sentenceUserId: 1, // モックユーザーID
      sentencePenName: 'モックユーザー',
      profileIconImage: '/path/to/avatar.jpg',
      evaluationGoodCount: 0,
      evaluationStayCount: 0,
      userEvaluation: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(newSentence, { status: 201 });
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

    return HttpResponse.json(mockEvaluation, { status: 201 });
  }),

  // ユーザー情報取得APIハンドラー
  http.get(`${apiBaseUrl}/users/me`, () => {
    return HttpResponse.json(mockUser, { status: 200 });
  }),

  // 認証トークンリフレッシュAPIハンドラー
  http.post(`${apiBaseUrl}/auth/refresh`, () => {
    // OpenAPI (conovel-openapi.yml) 定義では 200 かつボディなし
    return new HttpResponse(null, { status: 200 });
  }),
];
