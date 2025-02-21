import NovelCard from './NovelCard';
import { NovelProps } from '../../types/types';

const NovelCardContainer = ({
  novel,
  onClick,
}: {
  novel: NovelProps;
  onClick: () => void;
}) => {
  return (
    <NovelCard
      novel={novel}
      onClick={onClick}
      key={0}
      index={0}
      textIndex={0}
      text={''}
      evaluation_good_count={0}
      setEvaluation_good_count={function (): void {
        throw new Error('Function not implemented.');
      }}
      comment_count={0}
      setComment_count={function (): void {
        throw new Error('Function not implemented.');
      }}
      evaluation_stay_count={0}
      setEvaluation_stay_count={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default NovelCardContainer;
