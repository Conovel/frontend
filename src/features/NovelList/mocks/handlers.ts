import { http, HttpResponse } from 'msw';
import { NovelListItem, PostSentence, Sentence } from '../../../api/api';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
console.log('MSW API Base URL:', apiBaseUrl);

export const novelListHandlers = [
  // 小説一覧を取得するハンドラー
  http.get(`${apiBaseUrl}/v1/novels`, () => {
    console.log('MSW: Handling GET /v1/novels request');
    return HttpResponse.json([
      {
        titleId: 1,
        title: 'サンプル小説1',
        famousSentenceText: 'これはサンプル小説1の名言です。',
        authorUserId: 1,
        authorUserName: '作者1',
        profileIconImage: '/path/to/avatar1.jpg',
        titleGenres: ['ファンタジー', '冒険'],
        isNew: true,
        isFamous: true,
        viewCount: 100,
        evaluationGoodCount: 50,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        titleId: 2,
        title: 'サンプル小説2',
        famousSentenceText: 'これはサンプル小説2の名言です。',
        authorUserId: 2,
        authorUserName: '作者2',
        profileIconImage: '/path/to/avatar2.jpg',
        titleGenres: ['SF', 'アクション'],
        isNew: true,
        isFamous: false,
        viewCount: 50,
        evaluationGoodCount: 25,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ] as NovelListItem[]);
  }),

  // ルートパスのハンドラー
  http.get(`${apiBaseUrl}/v1`, () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // 投稿を作成するハンドラー
  http.post(`${apiBaseUrl}/v1/sentences`, async ({ request }) => {
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
      sentenceUserName: 'モックユーザー',
      profileIconImage: '/path/to/avatar.jpg',
      evaluationGoodCount: 0,
      evaluationStayCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(newSentence, { status: 201 });
  }),
];
