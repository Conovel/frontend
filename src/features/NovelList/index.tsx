import Grid from '@mui/material/Grid';
import NovelCardContainer from '../../components/novelCard/container';
import { Chips } from '../../components/chips';
import { Tags } from '../../components/tags';
import { useState } from 'react'; // API動作確認用
import { SentencesApi } from '../../api/api'; // API動作確認用
import { Sentence } from '../../types/types';
import { axiosConfig } from '../../axiosConfig';

/*  API動作確認用 */
const sentencesApi = new SentencesApi(axiosConfig);
/*  API動作確認用 ここまで */

export const novels = [
  {
    main_copy: '目を覚ますとエンジニアに転生していた',
    overview:
      '雪山で目を覚ますとエンジニアに転生していた.雪山ながら密林からガジェットを取り寄せて悠々生活・快適ライフを送っている',
    title:
      '山暮らし聖女の異世界スローライフ～聖女召喚された私，偽物だとして雪山に廃棄されるも，目が覚めるとエンジニアに転生していたことにより本当の「聖女」になる～',
    popular: true,
    newArrival: true,
    avatar: {
      src: '/static/images/avatar/1.jpg',
      alt: 'Remy Sharp',
      color: 'magenta',
      text: 'RS',
    },
    author_user_name: 'Remy Sharp',
    chips: [<Chips label='人気' />, <Chips label='新着' />],
    tags: [<Tags label='ラブストーリー' />, <Tags label='ファンタジー' />],
    reader_count: 100,
    updated_at: '2024/08/20',
    sentence_user_count: 150,
    sentence_hierarchy_count: 1000,
  },
];

const NovelList = () => {
  /*  API動作確認用 */
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const fetchSentences = async () => {
    try {
      const response = await sentencesApi.getSentenceById(1);
      // APIのレスポンスを適切な形式に変換
      if (response.data.main) {
        const apiSentence = response.data.main;
        // 必要なプロパティを持つオブジェクトを作成
        const convertedSentence: Sentence = {
          title: '',
          main_copy: '',
          overview: '',
          popular: false,
          newArrival: false,
          author_user_name: apiSentence.sentence_user_name || '',
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
          text: apiSentence.sentence || '',
          textIndex: 0,
          userId: apiSentence.sentence_user_id || 0,
          userName: apiSentence.sentence_user_name || '',
          profile_icon_image: apiSentence.profile_icon_image || '',
          evaluation_good_count: apiSentence.evaluation_good_count || 0,
          evaluation_stay_count: apiSentence.evaluation_stay_count || 0,
          created_at: apiSentence.created_at || '',
          updated_at: apiSentence.updated_at || '',
        };
        setSentences([convertedSentence]);
      } else {
        setSentences([]);
      }
    } catch (error) {
      // TODO: エラー時の対応について要検討（エラーがわかるような画面にするかなど）
      console.error('Error fetching sentences:', error);
    }
  };
  /* API動作確認用 ここまで */
  return (
    <Grid container spacing={2}>
      {novels.map((novel) => (
        <Grid item xs={12} sm={6} md={4} key={novel.title}>
          <NovelCardContainer
            novel={{
              ...novel,
              text: novel.main_copy,
              sentence_id: 0,
              sentence: '',
              userId: 0,
              userName: '',
              profile_icon_image: '',
              evaluation_good_count: 0,
              evaluation_stay_count: 0,
              textIndex: 0,
              created_at: '',
              children: [],
              parent: [],
              main: [],
            }}
            onClick={() => {
              /* handle click */
            }}
          />
        </Grid>
      ))}
      {/* API動作確認用 */}
      <button onClick={fetchSentences}>Fetch Sentences</button>
      <ul>
        {sentences.map((main: Sentence) => (
          <li key={main.sentence_id}>{main.sentence}</li>
        ))}
      </ul>
      {/* API動作確認用 ここまで */}
    </Grid>
  );
};

export default NovelList;
