import NovelCard from './presentation';

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
  sentence_count: number;
  sentence_user_count: number;
  chips: React.ReactNode[];
  tags: React.ReactNode[];
}

const NovelCardContainer = ({
  novel,
  chips,
  tags,
  onClick,
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

  return <NovelCard novel={novelData} onClick={onClick} />;
};

export default NovelCardContainer;
