import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { NovelsApi } from '../../api/api';
import type { NovelListItem } from '../../api/api';
import NovelCardContainer from '../../components/novelCard/container';
import { convertNovelListResponse } from './convert';
import { axiosConfig } from '../../axiosConfig';
import { fallbackNovelListData } from './mocks/data';
import { OGP } from '../../components/ogp';

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
        console.error('Error fetching novels:', error);
        // エラー時はフォールバックデータを表示
        setResponseNovels(fallbackNovelListData);
      }
    };

    fetchNovels();
  }, []);

  return (
    <>
      <OGP
        title='小説一覧'
        description='Conovelで公開されている小説の一覧です。気になる小説を見つけて、続きを書いてみましょう。'
        url='/'
      />
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
