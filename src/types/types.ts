// types.ts
export interface Sentence {
  title: string;
  main_copy: string;
  overview: string;
  popular: boolean;
  newArrival: boolean;
  author_user_name: string;
  chips: JSX.Element[];
  tags: JSX.Element[];
  reader_count: number;
  avatar: {
    src: string;
    alt: string;
    color: string;
    text: string;
  };
  sentence_id: number;
  sentence_user_count: number;
  sentence_hierarchy_count: number;
  sentence: string;
  textIndex: number;
  userId: number;
  userName: string;
  profile_icon_image: string;
  evaluation_good_count: number;
  evaluation_stay_count: number;
  created_at: string;
  updated_at: string;
}

export interface NovelProps {
  title: string;
  main_copy: string;
  overview: string;
  popular: boolean;
  newArrival: boolean;
  author_user_name: string;
  chips: { label: string }[];
  tags: { label: string }[];
  reader_count: number;
  avatar: {
    src: string;
    alt: string;
    color: string;
    text: string;
  };
  sentence_id: number;
  sentence_user_count: number;
  sentence_hierarchy_count: number;
  sentence: string;
  textIndex: number;
  userId: number;
  userName: string;
  profile_icon_image: string;
  evaluation_good_count: number;
  evaluation_stay_count: number;
  created_at: string;
  updated_at: string;
  children: Sentence[];
  main: Sentence[];
  parent: Sentence[];
}
