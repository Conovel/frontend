import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useNovelList } from '../../hooks/api/useNovelApi';
import NovelCardContainer from '../../components/novelCard/container';
import { fallbackNovelListData } from './mocks/data';
import { CircularProgress, Box, Alert } from '@mui/material';

const NovelList = () => {
  const { data: novels, loading, error, refetch } = useNovelList();

  useEffect(() => {
    console.log('Novels data:', novels);
  }, [novels]);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='200px'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error && !novels?.length) {
    return (
      <Box>
        <Alert severity='error' sx={{ mb: 2 }}>
          小説の取得に失敗しました。
          <Box
            component='span'
            sx={{ cursor: 'pointer', textDecoration: 'underline', ml: 1 }}
            onClick={() => refetch()}
          >
            再読み込み
          </Box>
        </Alert>
        <Grid container spacing={2}>
          {fallbackNovelListData.map((novel) => (
            <Grid item xs={12} sm={6} md={4} key={novel.titleId}>
              <NovelCardContainer
                novel={{
                  titleId: novel.titleId,
                  title: novel.title,
                  tags: novel.titleGenres.map((genre) => ({ label: genre })),
                  userId: novel.authorUserId,
                  authorUserName: novel.authorUserName,
                  profileIconImage: novel.profileIconImage,
                  sentence: novel.famousSentenceText,
                  evaluationGoodCount: novel.evaluationGoodCount,
                  readerCount: novel.viewCount,
                  popular: novel.isFamous,
                  newArrival: novel.isNew,
                  createdAt: novel.createdAt,
                  updatedAt: novel.updatedAt,
                  sentenceId: 2,
                  sentenceUserId: novel.authorUserId,
                  sentenceUserName: novel.authorUserName,
                  userName: novel.authorUserName,
                  evaluationStayCount: 0,
                  textIndex: 0,
                  children: [],
                  parent: [],
                  main: [],
                  chips: [],
                  mainCopy: novel.famousSentenceText,
                  overview: '',
                  // readerCountは既に上で設定済み
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
      </Box>
    );
  }

  const responseNovels = novels || [];

  return (
    <Grid container spacing={2}>
      {responseNovels.map((novel) => (
        <Grid item xs={12} sm={6} md={4} key={novel.novelId}>
          <NovelCardContainer
            novel={{
              titleId: parseInt(novel.novelId, 10),
              title: novel.title,
              tags: novel.tags.map((tag) => ({ label: tag })),
              userId: parseInt(novel.authorId, 10),
              authorUserName: novel.authorName,
              profileIconImage: '', // プロフィール画像は別途APIで取得する必要がある
              evaluationGoodCount: novel.likeCount,
              readerCount: novel.viewCount,
              popular: novel.viewCount > 100,
              newArrival:
                new Date(novel.createdAt).getTime() >
                Date.now() - 7 * 24 * 60 * 60 * 1000,
              createdAt: novel.createdAt,
              updatedAt: novel.updatedAt,
              sentence: novel.description,
              sentenceId: 2, // デフォルト値
              sentenceUserId: parseInt(novel.authorId, 10),
              sentenceUserName: novel.authorName,
              userName: novel.authorName,
              evaluationStayCount: 0,
              textIndex: 0,
              children: [],
              parent: [],
              main: [],
              chips: [],
              mainCopy: novel.description,
              overview: '',
              // readerCountは既に上で設定済み
              avatar: {
                src: '', // プロフィール画像は別途APIで取得する必要がある
                alt: novel.authorName,
                color: '#000000',
                text: novel.authorName,
              },
              sentenceUserCount: 0,
              sentenceHierarchyCount: 0,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NovelList;
