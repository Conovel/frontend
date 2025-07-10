import { NovelProps } from '../../types/types';
import NovelCard from './presentation';

const NovelCardContainer = ({
  novel,
  onClick,
}: {
  novel: NovelProps;
  onClick?: () => void;
}) => {
  return <NovelCard novel={novel} onClick={onClick} />;
};

export default NovelCardContainer;
