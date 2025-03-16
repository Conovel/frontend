import { NovelProps } from '../../types/types';
import NovelCard from './presentation';

const NovelCardContainer = ({
  novel,
  onClick,
}: {
  novel: NovelProps;
  onClick: () => void;
}) => {
  return (
    <NovelCard
      novel={{
        ...novel,
        children: Array.isArray(novel.children)
          ? novel.children.map((sentence) => sentence.text || '').join('')
          : '',
        main: Array.isArray(novel.main)
          ? novel.main.map((sentence) => sentence.text || '').join('')
          : novel.main,
      }}
      onClick={onClick}
    />
  );
};

export default NovelCardContainer;
