import { NovelListItem as NovelListItemApi } from '../../api/api';
import { NovelListItem } from '../../types/novels';

export const convertNovelListResponse = (
  response: NovelListItemApi[],
): NovelListItem[] => {
  const converted = response.map((res) => {
    return {
      titleId: res.title_id || 0,
      title: res.title || '',
      famousSentenceText: res.famous_sentence_text || '',
      authorUserId: res.author_user_id || 0,
      authorUserName: res.author_user_name || '',
      profileIconImage: res.profile_icon_image || '',
      titleGenres: res.title_genres || [],
      isNew: res.is_new || false,
      isFamous: res.is_famous || false,
      viewCount: res.view_count || 0,
      evaluationGoodCount: res.evaluation_good_count || 0,
      createdAt: res.created_at || '',
      updatedAt: res.updated_at || '',
    };
  });

  return converted;
};
