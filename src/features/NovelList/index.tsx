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

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await novelsApi.getNovels();
        // response.dataが配列であることを確認
        if (Array.isArray(response.data)) {
          const convertedResponse: NovelListItem[] = convertNovelListResponse(
            response.data,
          );
          setResponseNovels(convertedResponse);
        } else if (
          response.data &&
          typeof response.data === 'object' &&
          'error' in response.data
        ) {
          // エラーレスポンスの場合
          console.error('API Error:', (response.data as any).error);
          setResponseNovels([]); // エラー時も空配列を設定
        } else {
          // 予期しない形式の場合
          console.error('Unexpected response format:', response.data);
          setResponseNovels([]); // 予期しない形式でも空配列を設定
        }
      } catch (error) {
        // TODO: エラー時の対応について要検討（エラーがわかるような画面にするかなど）
        console.error('Error fetching sentences:', error);
      }
    };

    fetchNovels();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {responseNovels.map((novel) => (
          <Grid item xs={12} sm={6} md={4} key={novel.title_id}>
            <NovelCardContainer
              novel={{
                ...novel,
                sentence: novel.famous_sentence_text,
                sentence_id: 2,
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
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NovelList;
