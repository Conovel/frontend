import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { NovelsApi } from '../../api/api';
import NovelCardContainer from '../../components/novelCard/container';
import { NovelListItem } from '../../types/types';
import { convertNovelListResponse } from './convert';
import { Box, Typography } from '@mui/material';
import { axiosConfig } from '../../axiosConfig';
import { mockNovels } from './mocks/data';

const novelsApi = new NovelsApi(axiosConfig);

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
      console.error('Error fetching sentences:', error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {mockNovels.map((novel) => (
          <Grid item xs={12} sm={6} md={4} key={novel.title}>
            <NovelCardContainer
              novel={{
                ...novel,
                sentence: novel.main_copy,
                sentence_id: 0,
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
                chips: novel.chips,
                tags: novel.tags,
              }}
              onClick={() => {
                /* handle click */
              }}
            />
          </Grid>
        ))}
      </Grid>

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
    </>
  );
};

export default NovelList;
