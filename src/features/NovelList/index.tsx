import Grid from '@mui/material/Grid';
import NovelCardContainer from '../../components/novelCard/container';
import { Chips } from '../../components/chips';
import { Tags } from '../../components/tags';
import { useState } from "react"; // API動作確認用
import { SentencesApi, Sentence } from "../../api/api"; // API動作確認用
import { Configuration } from "../../api/configuration"; // API動作確認用

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

const novels = [
  {
    description:
      '雪山で目を覚ますとエンジニアに転生していた.雪山ながら密林からガジェットを取り寄せて悠々生活・快適ライフを送っている',
    title:
      '山暮らし聖女の異世界スローライフ～聖女召喚された私，偽物だとして雪山に廃棄されるも，目が覚めるとエンジニアに転生していたことにより本当の「聖女」になる',
    popular: true,
    newArrival: true,
    avatar: {
      src: '/static/images/avatar/1.jpg',
      alt: 'Remy Sharp',
      color: 'magenta',
      text: 'RS',
    },
    author: 'Remy Sharp',
    loveStory: true,
    fantasy: true,
    views: 100,
    date: '2024/08/20',
    chips: [<Chips label='人気' />, <Chips label='新着' />],
    tags: [<Tags label='ラブストーリー' />, <Tags label='ファンタジー' />],
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
            novel={novel}
            chips={novel.chips}
            tags={novel.tags}
          />

          {/* API動作確認用 */}
          <button onClick={fetchSentences}>Fetch Sentences</button>
          <ul>
            {sentences.map((main: Sentence) => (
              <li key={main.sentence_id}>{main.sentence}</li>
            ))}
          </ul>
          {/* API動作確認用 ここまで */}
        </Grid>
      ))}
    </Grid>
  );
};

export default NovelList;
