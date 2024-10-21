import Grid from '@mui/material/Grid';
import NovelCard from '../../components/novelCard';
import { PopularChips, NewArrivalsChips } from '../../components/chips';
import { FantasyTags, LoveStoryTags } from '../../components/tags';

const novels = [
  {
    description:
      '雪山で目を覚ますとエンジニアに転生していた.雪山ながら密林からガジェットを取り寄せて悠々生活・快適ライフを送っている',
    title:
      '山暮らし聖女の異世界スローライフ～聖女召喚された私，偽物だとして雪山に廃棄されるも，目が覚めるとエンジニアに転生していたことにより本当の「聖女」になる',
    popular: true,
    newArrival: true,
    avatar: {
      src: '/static/images/avatar/1.jpg',
      alt: 'Remy Sharp',
      color: 'magenta',
      text: 'RS',
    },
    author: 'Remy Sharp',
    chips: [<PopularChips />, <NewArrivalsChips />],
    tags: [<LoveStoryTags />, <FantasyTags />],
    loveStory: true,
    fantasy: true,
    views: 100,
    date: '2024/08/20',
  },
];

const NovelList = () => {
  return (
    <Grid container spacing={2}>
      {novels.map((novel) => (
        <Grid item xs={12} sm={6} md={4} key={novel.title}>
          <NovelCard novel={novel} />
        </Grid>
      ))}
    </Grid>
  );
};

export default NovelList;
