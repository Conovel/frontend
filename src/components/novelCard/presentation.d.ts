import * as React from 'react';
export interface NovelProps {
  main_copy: string;
  overview: string;
  title: string;
  text: string;
  textIndex: number;
  children: string;
  main: string;
  parent: string;
  avatar: {
    src: string;
    alt: string;
    color: string;
    text: string;
  };
  author_user_name: string;
  reader_count: number;
  updated_at: string;
  sentence_hierarchy_count: number;
  sentence_user_count: number;
  chips: React.ReactNode[];
  tags: React.ReactNode[];
}
declare const NovelCard: ({
  novel,
}: {
  novel: NovelProps;
  onClick: () => void;
}) => import('react/jsx-runtime').JSX.Element;
export default NovelCard;
