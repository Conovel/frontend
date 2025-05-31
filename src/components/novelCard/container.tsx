import { NovelProps } from './NovelCard';
import NovelCard from './presentation';

const NovelCardContainer = ({
  novel,
  onClick,
}: {
  novel: NovelProps;
  onClick: () => void;
}) => {
  return <NovelCard novel={novel} onClick={onClick} key={0} />;
};

export default NovelCardContainer;
