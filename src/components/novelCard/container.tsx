import { NovelProps } from '../../types/types';
import NovelCard from './presentation';

const NovelCardContainer = ({ novel }: { novel: NovelProps }) => {
  return <NovelCard novel={novel} />;
};

export default NovelCardContainer;
