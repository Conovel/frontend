import { NovelListItem } from '../../api';
import NovelCard from './presentation';

const NovelCardContainer = ({
  novel,
  onClick,
}: {
  novel: NovelListItem;
  onClick: () => void;
}) => {
  return <NovelCard novel={novel} onClick={onClick} key={0} />;
};

export default NovelCardContainer;
