import { NovelProps } from './presentation';
declare const NovelCardContainer: ({
  novel,
  chips,
  tags,
}: {
  novel: NovelProps;
  chips: React.ReactNode[];
  tags: React.ReactNode[];
  onClick: () => void;
}) => import('react/jsx-runtime').JSX.Element;
export default NovelCardContainer;
