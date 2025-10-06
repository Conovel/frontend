import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { NovelsApi } from '../../api/api';
import NovelCardContainer from '../../components/novelCard/container';
import { NovelListItemWithUI } from '../../types/types';
import { convertNovelListResponse } from './convert';
import { axiosConfig } from '../../axiosConfig';
import { fallbackNovelListData } from './mocks/data';

const novelsApi = new NovelsApi(axiosConfig);

const NovelList = () => {
  const [responseNovels, setResponseNovels] = useState<NovelListItemWithUI[]>(
    [],
  );

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        console.log('Fetching novels...');
        const response = await novelsApi.getNovels();

        const convertedResponse: NovelListItemWithUI[] =
          convertNovelListResponse(response.data);
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
            <NovelCardContainer novel={novel} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NovelList;
