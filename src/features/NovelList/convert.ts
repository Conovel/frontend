import { NovelListItemWithUI } from '../../types/types';

// Convert API response to NovelListItemWithUI format
export const convertNovelListResponse = (
  data: any[],
): NovelListItemWithUI[] => {
  if (!Array.isArray(data)) {
    console.error('Expected array but got:', data);
    return [];
  }

  return data.map((item) => ({
    titleId: item.titleId || item.id || 0,
    title: item.title || '',
    famousSentenceText: item.famousSentenceText || item.sentence || '',
    authorUserId: item.authorUserId || item.userId || 0,
    authorUserName: item.authorUserName || item.authorPenName || '',
    profileIconImage: item.profileIconImage || '',
    titleGenres: item.titleGenres || [],
    isNew: item.isNew || false,
    isFamous: item.isFamous || false,
    viewCount: item.viewCount || item.readerCount || 0,
    evaluationGoodCount: item.evaluationGoodCount || 0,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
    // UI-specific additional fields
    avatar: {
      src: item.profileIconImage || '',
      alt: item.authorUserName || item.authorPenName || '',
      color: '#000000',
      text: (item.authorUserName || item.authorPenName || '').charAt(0),
    },
    chips: [],
    tags: (item.titleGenres || []).map((genre: string) => ({ label: genre })),
    readerCount: item.viewCount || item.readerCount || 0,
    sentenceUserCount: 0,
    sentenceHierarchyCount: 0,
    mainCopy: item.famousSentenceText || item.sentence || '',
    popular: item.isFamous || false,
    newArrival: item.isNew || false,
  }));
};
