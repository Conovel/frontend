import NovelCard from './presentation';
import { NovelProps } from './presentation';

const NovelCardContainer = ({
  novel,
  chips,
  tags,
}: {
  novel: NovelProps;
  chips: React.ReactNode[];
  tags: React.ReactNode[];
  onClick: () => void;
}) => {
  const novelData = {
    ...novel,
    chips,
    tags,
  };

  return <NovelCard novel={novelData} />;
};

export default NovelCardContainer;
