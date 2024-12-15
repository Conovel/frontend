import Grid from '@mui/material/Grid';
import NovelCardContainer from '../../components/novelCard/container';
import { Chips } from '../../components/chips';
import { Tags } from '../../components/tags';

export const novels = [
  {
    description:
      '雪山で目を覚ますとエンジニアに転生していた.雪山ながら密林からガジェットを取り寄せて悠々生活・快適ライフを送っている',
    title:
      '山暮らし聖女の異世界スローライフ～聖女召喚された私，偽物だとして雪山に廃棄されるも，目が覚めるとエンジニアに転生していたことにより本当の「聖女」になる～',
    popular: true,
    newArrival: true,
    avatar: {
      src: '/static/images/avatar/1.jpg',
      alt: 'Remy Sharp',
      color: 'magenta',
      text: 'RS',
    },
    author_user_name: 'Remy Sharp',
    chips: [<Chips label='人気' />, <Chips label='新着' />],
    tags: [<Tags label='ラブストーリー' />, <Tags label='ファンタジー' />],
    reader_count: 100,
    updated_at: '2024/08/20',
    sentence_user_count: 150,
    sentence_hierarchy_count: 1000,
  },
];

const NovelList = ({ onNovelClick }: { onNovelClick: () => void }) => {
  // Accept onNovelClick prop
  return (
    <Grid container spacing={2}>
      {novels.map((novel) => (
        <Grid item xs={12} sm={6} md={4} key={novel.title}>
          <NovelCardContainer
            novel={novel}
            chips={novel.chips}
            tags={novel.tags}
            onClick={onNovelClick} // Pass the click handler
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NovelList;
