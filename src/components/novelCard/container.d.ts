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
  chips: React.ReactNode[];
  tags: React.ReactNode[];
}
declare const NovelCardContainer: ({
  novel,
  chips,
  tags,
}: {
  novel: NovelProps;
  chips: React.ReactNode[];
  tags: React.ReactNode[];
}) => import('react/jsx-runtime').JSX.Element;
export default NovelCardContainer;
