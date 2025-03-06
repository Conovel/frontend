import Grid from '@mui/material/Grid';
import { Chips } from '../../components/chips';
import { Tags } from '../../components/tags';
import { useState } from 'react'; // API動作確認用
import { NovelsApi } from '../../api/api'; // API動作確認用
import NovelCardContainer from '../../components/novelCard/container';
import { NovelListItem } from '../../types/types';
import { convertNovelListResponse } from './convert';
import { Box, Typography } from '@mui/material';
import { axiosConfig } from '../../axiosConfig';

/*  API動作確認用 */

const novelsApi = new NovelsApi(axiosConfig);
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
  const [responseNovels, setResponseNovels] = useState<NovelListItem[]>([]);

  const fetchNovels = async () => {
    try {
      const response = await novelsApi.getNovels();
      const mappedResponse: NovelListItem[] = convertNovelListResponse(
        response.data,
      );
      setResponseNovels(mappedResponse);
    } catch (error) {
      // TODO: エラー時の対応について要検討（エラーがわかるような画面にするかなど）
      console.error('Error fetching sentences:', error);
    }
  };
  /* API動作確認用 ここまで */
  return (
    <>
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
      </Grid>

      {/** API動作確認用 */}
      <button onClick={fetchNovels}>Fetch Novels</button>
      <Box>
        {responseNovels.map((res) => (
          <Box key={res.title_id}>
            <Typography>title_id：{res.title_id}</Typography>
            <Typography>title：{res.title}</Typography>
            <Typography>
              famous_sentence_text：{res.famous_sentence_text}
            </Typography>
            <Typography>author_user_id：{res.author_user_id}</Typography>
            <Typography>author_user_name：{res.author_user_name}</Typography>
            <Typography>
              profile_icon_image：{res.profile_icon_image}
            </Typography>
            {/** // TODO：仮でindex0番目だけ */}
            <Typography>title_genres：{res.title_genres[0]}</Typography>
            <Typography>is_new：{res.is_new}</Typography>
            <Typography>is_famous：{res.is_famous}</Typography>
            <Typography>view_count：{res.view_count}</Typography>
            <Typography>
              evaluation_good_count：{res.evaluation_good_count}
            </Typography>
            <Typography>created_at：{res.created_at}</Typography>
            <Typography>updated_at{res.updated_at}</Typography>
          </Box>
        ))}
      </Box>
      {/** API動作確認用ここまで */}
    </>
  );
};

export default NovelList;
