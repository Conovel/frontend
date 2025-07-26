import { NovelListItem as NovelListItemApi } from '../../api/api';
import { NovelListItem } from '../../types/types';

export const convertNovelListResponse = (
  response: NovelListItemApi[],
): NovelListItem[] => {
  return response.map((res) => {
    return {
      titleId: res.titleId || 0,
      title: res.title || '',
      famousSentenceText: res.famousSentenceText || '',
      authorUserId: res.authorUserId || 0,
      authorUserName: res.authorPenName || '',
      profileIconImage: res.profileIconImage || '',
      titleGenres: res.titleGenres || [],
      isNew: res.isNew || false,
      isFamous: res.isFamous || false,
      viewCount: res.viewCount || 0,
      evaluationGoodCount: res.evaluationGoodCount || 0,
      createdAt: res.createdAt || '',
      updatedAt: res.updatedAt || '',
    };
  });
};
