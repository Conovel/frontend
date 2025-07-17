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
        console.log('Fetching novels...');
        const response = await novelsApi.getNovels();

        const convertedResponse: NovelListItem[] = convertNovelListResponse(
          response.data,
        );
        console.log('Converted novels:', convertedResponse);
        setResponseNovels(convertedResponse);
      } catch (error) {
        console.error('Error fetching novels:', error);
        // エラー時はモックデータを表示
        setResponseNovels([
          {
            title_id: 1,
            title: 'サンプル小説1',
            famous_sentence_text: 'これはサンプル小説1の名言です。',
            author_user_id: 1,
            author_user_name: '作者1',
            profile_icon_image: '/path/to/avatar1.jpg',
            title_genres: ['ファンタジー', '冒険'],
            is_new: true,
            is_famous: true,
            view_count: 100,
            evaluation_good_count: 50,
            created_at: '2024-03-20T00:00:00Z',
            updated_at: '2024-03-20T00:00:00Z',
          },
          {
            title_id: 2,
            title: 'サンプル小説2',
            famous_sentence_text: 'これはサンプル小説2の名言です。',
            author_user_id: 2,
            author_user_name: '作者2',
            profile_icon_image: '/path/to/avatar2.jpg',
            title_genres: ['SF', 'アクション'],
            is_new: true,
            is_famous: false,
            view_count: 50,
            evaluation_good_count: 25,
            created_at: '2024-03-20T00:00:00Z',
            updated_at: '2024-03-20T00:00:00Z',
          },
        ]);
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
