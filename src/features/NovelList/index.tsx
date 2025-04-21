import Grid from '@mui/material/Grid';
import { useState } from 'react'; //API動作確認用
import { NovelsApi } from '../../api/api'; //API動作確認用
import NovelCardContainer from '../../components/novelCard/container';
import { NovelListItem } from '../../types/types';
import { convertNovelListResponse } from './convert';
import { Box, Typography } from '@mui/material';
import { axiosConfig } from '../../axiosConfig';

/*APi動作確認用 */
const novelsApi = new NovelsApi(axiosConfig);
/*APi動作確認用　ここまで */

const NovelList = () => {
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

  return (
    <>
      <Grid container spacing={2}>
        {responseNovels.map((novel) => (
          <Grid item xs={12} sm={6} md={4} key={novel.title_id}>
            <NovelCardContainer
              novel={{
                ...novel,
                sentence: novel.famous_sentence_text,
                sentence_id: 0,
                userId: novel.author_user_id,
                userName: novel.author_user_name,
                profile_icon_image: novel.profile_icon_image,
                evaluation_good_count: novel.evaluation_good_count,
                evaluation_stay_count: 0,
                textIndex: 0,
                created_at: novel.created_at,
                children: [],
                parent: [],
                main: [],
                chips: [],
                tags: novel.title_genres.map((genre) => ({
                  label: genre,
                })),
                main_copy: novel.famous_sentence_text,
                overview: '',
                popular: novel.is_famous,
                newArrival: novel.is_new,
                reader_count: novel.view_count,
                avatar: {
                  src: novel.profile_icon_image,
                  alt: novel.author_user_name,
                  color: '#000000',
                  text: novel.author_user_name,
                },
                sentence_user_count: 0,
                sentence_hierarchy_count: 0,
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
            {/** // TODO：仮でindex0番目だけ */}
            <Typography>
              profile_icon_image：{res.profile_icon_image}
            </Typography>
            <Typography>title_genres：{res.title_genres[0]}</Typography>
            <Typography>is_new：{res.is_new}</Typography>
            <Typography>is_famous：{res.is_famous}</Typography>
            <Typography>view_count：{res.view_count}</Typography>
            <Typography>
              evaluation_good_count：{res.evaluation_good_count}
            </Typography>
            <Typography>created_at：{res.created_at}</Typography>
            <Typography>updated_at{res.updated_at}</Typography>
            {/*API動作確認用　ここまで */}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default NovelList;
