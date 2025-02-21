import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import NovelCardContainer from '../../components/novelcard/container';
import { Chips } from '../../components/chips';
import { Tags } from '../../components/tags';
import { useState } from 'react'; // API動作確認用
import { SentencesApi, Sentence } from '../../api/api'; // API動作確認用
import { Configuration } from '../../api/configuration'; // API動作確認用

/*  API動作確認用 */
const apiBaseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_API_BASE_URL
  : import.meta.env.VITE_DEVELOPMENT_API_BASE_URL;

const config = new Configuration({
  basePath: apiBaseUrl,
  // apiKey: 'your-api-key', // APIキーが必要な場合は設定
});

const api = new SentencesApi(config);
/*  API動作確認用 ここまで */

const NovelItem = styled(Box)({
  width: '100%',
  marginBottom: '16px',
});

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
      const response = await api.getSentenceById(1);
      setSentences(response.data.main ? [response.data.main] : []);
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
