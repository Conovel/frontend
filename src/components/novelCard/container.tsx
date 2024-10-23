import NovelCard from './presentation';
import { Chips } from '../../components/chips';
import { Tags } from '../../components/tags';

interface NovelProps {
  description: string;
  title: string;
  popular: boolean;
  newArrival: boolean;
  avatar: {
    src: string;
    alt: string;
    color: string;
    text: string;
  };
  author: string;
  loveStory: boolean;
  fantasy: boolean;
  views: number;
  date: string;
}

const NovelCardContainer = ({ novel }: { novel: NovelProps }) => {
  const novelData = {
    ...novel,
    chips: novel.popular ? [<Chips label='人気' />] : [],
    tags: novel.loveStory ? [<Tags label='ラブストーリー' />] : [],
  };

  return <NovelCard novel={novelData} />;
};

export default NovelCardContainer;
