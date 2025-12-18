import type { NovelListItem } from '../../api/api';
import NovelCard from './presentation';

const NovelCardContainer = ({
  novel,
  onClick,
}: {
  novel: NovelListItem;
  onClick?: () => void;
}) => {
  return <NovelCard novel={novel} onClick={onClick} />;
};

export default NovelCardContainer;
