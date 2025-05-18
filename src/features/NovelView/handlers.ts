import { SentencesApi } from '../../api/api';
import { Sentence } from '../../types/types';

export const fetchNovelData = async (id: string): Promise<Sentence | null> => {
  try {
    const sentencesApi = new SentencesApi();
    const response = await sentencesApi.getSentenceById(parseInt(id));

    if (response.status !== 200 || !response.data.main) {
      throw new Error('Failed to fetch sentence data');
    }

    const apiSentence = response.data.main as any;
    return {
      title: '',
      main_copy: '',
      overview: '',
      popular: false,
      newArrival: false,
      author_user_name: '',
      chips: [],
      tags: [],
      reader_count: 0,
      avatar: {
        src: '',
        alt: '',
        color: '',
        text: '',
      },
      sentence_id: apiSentence.sentence_id || 0,
      sentence_user_count: 0,
      sentence_hierarchy_count: 0,
      sentence: apiSentence.sentence || '',
      textIndex: 0,
      userId: 0,
      userName: '',
      profile_icon_image: '',
      evaluation_good_count: 0,
      evaluation_stay_count: 0,
      comment_count: apiSentence.comment_count ? apiSentence.comment_count : 0,
      created_at: apiSentence.created_at || '',
      updated_at: apiSentence.updated_at || '',
    };
  } catch (error) {
    console.error('Error fetching novel data:', error);
    return null;
  }
};
