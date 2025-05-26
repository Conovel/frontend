import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { NovelsApi } from '../../api/api';
import NovelCardContainer from '../../components/novelCard/container';
import { convertNovelListResponse } from './convert';
import { axiosConfig } from '../../axiosConfig';
import { NovelListItem } from '../../types/novels';

const novelsApi = new NovelsApi(axiosConfig);

const NovelList = () => {
  const [responseNovels, setResponseNovels] = useState<NovelListItem[]>([]);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await novelsApi.getNovels();
        const convertedResponse: NovelListItem[] = convertNovelListResponse(
          response.data,
        );
        setResponseNovels(convertedResponse);
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
          <Grid item xs={12} sm={6} md={4} key={novel.titleId}>
            <NovelCardContainer
              novel={{
                ...novel,
                sentence: novel.famousSentenceText,
                sentence_id: 0,
                userId: novel.authorUserId,
                userName: novel.authorUserName,
                profile_icon_image: novel.profileIconImage,
                evaluation_good_count: novel.evaluationGoodCount,
                evaluation_stay_count: 0,
                textIndex: 0,
                created_at: novel.createdAt,
                children: [],
                parent: [],
                main: [],
                chips: [],
                tags: novel.titleGenres.map((genre) => ({ label: genre })),
                main_copy: novel.famousSentenceText,
                overview: '',
                popular: novel.isFamous,
                newArrival: novel.isNew,
                reader_count: novel.viewCount,
                avatar: {
                  src: novel.profileIconImage,
                  alt: novel.authorUserName,
                  color: '#000000',
                  text: novel.authorUserName,
                },
                sentence_user_count: 0,
                sentence_hierarchy_count: 0,
                author_user_name: novel.authorUserName,
                updated_at: novel.updatedAt,
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
