interface Novel {
  description: string;
  title: string;
  chips: React.ReactNode[];
  avatar: {
    src: string;
    alt: string;
    color: string;
    text: string;
  };
  author: string;
  tags: React.ReactNode[];
  views: number;
  date: string;
}
declare const NovelCard: ({
  novel,
}: {
  novel: Novel;
}) => import('react/jsx-runtime').JSX.Element;
export default NovelCard;
