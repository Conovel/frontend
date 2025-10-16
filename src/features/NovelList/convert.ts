import type { NovelListItem } from '../../api/api';

// Convert API response to NovelListItem format
export const convertNovelListResponse = (data: any[]): NovelListItem[] => {
  if (!Array.isArray(data)) {
    console.error('Expected array but got:', data);
    return [];
  }

  return data.map((item) => ({
    titleId: item.titleId || item.id || 0,
    title: item.title || '',
    famousSentenceText: item.famousSentenceText || item.sentence || '',
    authorUserId: item.authorUserId || item.userId || 0,
    authorPenName: item.authorPenName || item.authorUserName || '',
    profileIconImage: item.profileIconImage || '',
    titleGenres: item.titleGenres || [],
    isNew: item.isNew || false,
    isFamous: item.isFamous || false,
    viewCount: item.viewCount || item.readerCount || 0,
    evaluationGoodCount: item.evaluationGoodCount || 0,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  }));
};
