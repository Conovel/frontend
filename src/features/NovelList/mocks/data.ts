import { NovelListItem } from '../../../api/api';

export const novels: NovelListItem[] = [
  {
    titleId: 1,
    title:
      '山暮らし聖女の異世界スローライフ～聖女召喚された私，偽物だとして雪山に廃棄されるも，目が覚めるとエンジニアに転生していたことにより本当の「聖女」になる～',
    authorPenName: 'Remy Sharp',
    updatedAt: '2024/08/20',
    createdAt: new Date().toISOString(),
    profileIconImage: '/static/images/avatar/1.jpg',
  },
];

// NovelList用のモックデータ（src/types/types.tsのNovelListItem型に合わせる）
export const mockNovelListData: NovelListItem[] = [
  {
    titleId: 1,
    title: 'サンプル小説1',
    famousSentenceText: 'これはサンプル小説1の名言です。',
    authorUserId: 1,
    authorPenName: '作者1',
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
    authorPenName: '作者2',
    profileIconImage: '/path/to/avatar2.jpg',
    titleGenres: ['SF', 'アクション'],
    isNew: true,
    isFamous: false,
    viewCount: 50,
    evaluationGoodCount: 25,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

// エラー時のフォールバックデータ
export const fallbackNovelListData: NovelListItem[] = [
  {
    titleId: 1,
    title: 'サンプル小説1',
    famousSentenceText: 'これはサンプル小説1の名言です。',
    authorUserId: 1,
    authorPenName: '作者1',
    profileIconImage: '/path/to/avatar1.jpg',
    titleGenres: ['ファンタジー', '冒険'],
    isNew: true,
    isFamous: true,
    viewCount: 100,
    evaluationGoodCount: 50,
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
  {
    titleId: 2,
    title: 'サンプル小説2',
    famousSentenceText: 'これはサンプル小説2の名言です。',
    authorUserId: 2,
    authorPenName: '作者2',
    profileIconImage: '/path/to/avatar2.jpg',
    titleGenres: ['SF', 'アクション'],
    isNew: true,
    isFamous: false,
    viewCount: 50,
    evaluationGoodCount: 25,
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
];
