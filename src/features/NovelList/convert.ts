import { NovelListItem as NovelListItemApi } from '../../api/api';
import { NovelListItem } from '../../types/types';

export const convertNovelListResponse = (
  response: NovelListItemApi[],
): NovelListItem[] => {
  const converted = response.map((res) => {
    return {
      title_id: res.title_id || 0,
      title: res.title || '',
      famous_sentence_text: res.famous_sentence_text || '',
      author_user_id: res.author_user_id || 0,
      author_user_name: res.author_user_name || '',
      profile_icon_image: res.profile_icon_image || '',
      title_genres: res.title_genres || [],
      is_new: res.is_new || false,
      is_famous: res.is_famous || false,
      view_count: res.view_count || 0,
      evaluation_good_count: res.evaluation_good_count || 0,
      created_at: res.created_at || '',
      updated_at: res.updated_at || '',
    };
  });

  return converted;
};
