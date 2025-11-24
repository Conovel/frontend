import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { NovelListItem, NovelsApi } from '../../api/api';
import NovelCardContainer from '../../components/novelCard/container';
import { axiosConfig } from '../../axiosConfig';
import { OGP } from '../../components/ogp';

const novelsApi = new NovelsApi(axiosConfig);

const NovelList = () => {
  const [responseNovels, setResponseNovels] = useState<NovelListItem[]>([]);

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await novelsApi.getNovels();

        setResponseNovels(response.data);
      } catch (error) {
        // TODO: エラー時の対応について要検討（エラーがわかるような画面にするかなど）
        console.error('Error fetching sentences:', error);
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
            <NovelCardContainer
              novel={novel}
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
