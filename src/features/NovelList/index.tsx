import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { NovelsApi } from '../../api/api';
import NovelCardContainer from '../../components/novelCard/container';
import { NovelListItem } from '../../types/types';
import { convertNovelListResponse } from './convert';
import { axiosConfig } from '../../axiosConfig';
import { fallbackNovelListData } from './mocks/data';

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
        // エラー時はフォールバックデータを表示
        setResponseNovels(fallbackNovelListData);
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
                sentenceId: 2,
                userId: novel.authorUserId,
                userName: novel.authorUserName,
                profileIconImage: novel.profileIconImage,
                evaluationGoodCount: novel.evaluationGoodCount,
                evaluationStayCount: 0,
                textIndex: 0,
                createdAt: novel.createdAt,
                children: [],
                parent: [],
                main: [],
                chips: [],
                tags: novel.titleGenres.map((genre) => ({ label: genre })),
                mainCopy: novel.famousSentenceText,
                overview: '',
                popular: novel.isFamous,
                newArrival: novel.isNew,
                readerCount: novel.viewCount,
                avatar: {
                  src: novel.profileIconImage,
                  alt: novel.authorUserName,
                  color: '#000000',
                  text: novel.authorUserName,
                },
                sentenceUserCount: 0,
                sentenceHierarchyCount: 0,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NovelList;
