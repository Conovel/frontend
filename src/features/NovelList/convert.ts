import { NovelListItem as NovelListItemApi } from '../../api/api';
import { NovelListItem } from '../../types/types';

export const convertNovelListResponse = (
  response: NovelListItemApi[],
): NovelListItem[] => {
  const converted = response.map((res) => {
    return {
      title_id: res.titleId || 0,
      title: res.title || '',
      famous_sentence_text: res.famousSentenceText || '',
      author_user_id: res.authorUserId || 0,
      author_user_name: res.authorUserName || '',
      profile_icon_image: res.profileIconImage || '',
      title_genres: res.titleGenres || [],
      is_new: res.isNew || false,
      is_famous: res.isFamous || false,
      view_count: res.viewCount || 0,
      evaluation_good_count: res.evaluationGoodCount || 0,
      created_at: res.createdAt || '',
      updated_at: res.updatedAt || '',
    };
  });

  return converted;
};
