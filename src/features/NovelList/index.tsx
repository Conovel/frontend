import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { NovelsApi } from '../../api/api';
import NovelCardContainer from '../../components/novelCard/container';
import { NovelListItem } from '../../types/types';
import { convertNovelListResponse } from './convert';
import { axiosConfig } from '../../axiosConfig';

const novelsApi = new NovelsApi(axiosConfig);

const NovelList = () => {
  const [responseNovels, setResponseNovels] = useState<NovelListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await novelsApi.getNovels();
        console.log('API Response:', response); // デバッグ用ログ
        console.log('Response type:', typeof response.data); // レスポンスの型を確認
        console.log('Is Array?', Array.isArray(response.data)); // 配列かどうかを確認

        if (!Array.isArray(response.data)) {
          throw new Error('API response is not in the expected array format');
        }

        const convertedResponse: NovelListItem[] = convertNovelListResponse(
          response.data,
        );
        setResponseNovels(convertedResponse);
        setError(null);
      } catch (error) {
        console.error('Error fetching sentences:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to fetch novels',
        );
      }
    };

    fetchNovels();
  }, []);

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

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
                tags: novel.title_genres.map((genre) => ({ label: genre })),
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
                // TODO：不要なonClick削除する
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NovelList;
