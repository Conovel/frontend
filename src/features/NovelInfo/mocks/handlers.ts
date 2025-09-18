import { http, HttpResponse } from 'msw';
import { NovelDetail } from '../../../api/api';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
console.log('MSW API Base URL:', apiBaseUrl);

// モックデータ
const mockNovelDetailData: NovelDetail = {
  titleId: 1,
  title: 'サンプル小説タイトル',
  famousSentenceText: 'これは印象に残るシーンです。',
  authorUserId: 1,
  authorPenName: 'サンプル作者',
  profileIconImage: '/path/to/author-avatar.jpg',
  titleGenres: ['ファンタジー', '冒険'],
  isNew: true,
  isFamous: false,
  viewCount: 150,
  evaluationGoodCount: 25,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T12:00:00Z',
  mainCopy: 'これは小説の紹介文です。魅力的なストーリーが展開されます。',
  sentenceUserCount: 5,
  sentenceHierarchyCount: 12,
  readerCount: 45,
  overview:
    'これは小説のあらすじです。主人公が冒険に出発し、様々な困難を乗り越えながら成長していく物語です。',
};

export const novelInfoHandlers = [
  // 小説詳細情報を取得するハンドラー
  http.get(`${apiBaseUrl}/v1/novels/:titleId`, ({ params }) => {
    const { titleId } = params;
    console.log('MSW: Handling GET /v1/novels/:titleId request', { titleId });

    // titleIdに基づいてモックデータを返す
    const novelData = {
      ...mockNovelDetailData,
      titleId: Number(titleId),
      title: `小説タイトル ${titleId}`,
    };

    return HttpResponse.json(novelData);
  }),
];
