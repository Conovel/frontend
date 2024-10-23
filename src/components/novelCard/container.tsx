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
  chips: React.ReactNode[];
  tags: React.ReactNode[];
}

const NovelCardContainer = ({
  novel,
  chips,
  tags,
}: {
  novel: NovelProps;
  chips: React.ReactNode[];
  tags: React.ReactNode[];
}) => {
  const novelData = {
    ...novel,
    chips,
    tags,
  };

  return <NovelCard novel={novelData} />;
};

export default NovelCardContainer;
