// types.ts
import * as React from 'react';

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

export interface ViewSentence {
  main: Sentence[];
  parent: Sentence[];
  parallels: Sentence[];
  children: Sentence[];
}

export interface NovelListItem {
  title_id: number;
  title: string;
  famous_sentence_text: string;
  author_user_id: number;
  author_user_name: string;
  profile_icon_image: string;
  title_genres: string[];
  is_new: boolean;
  is_famous: boolean;
  view_count: number;
  evaluation_good_count: number;
  created_at: string;
  updated_at: string;
}

export interface NovelDetail extends NovelListItem {
  main_copy: string;
  sentence_user_count: number;
  sentence_hierarchy_count: number;
  reader_count: number;
  overview: string;
}

export interface User {
  user_id: number;
  user_name: string;
  nick_name: string;
  profile_icon_image: string;
  evaluation_good_count: number;
  created_at: string;
  updated_at: string;
}

export interface ViewMeUser extends User {
  birth_year_and_month: string;
  is_anonymous: boolean;
}

export interface UpdateUser {
  user_name: string;
  nick_name: string;
  is_anonymous: boolean;
  profile_icon_image: string;
}

export interface ErrorResponse {
  error: {
    code: number;
    message: string;
  };
}

export interface NovelViewPresentationProps {
  mainPanel: Sentence[];
  parentPanel: Sentence[];
  childrenPanel: Sentence[];
  start_index_parent: number;
  setStart_index_parent: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_count_parent: number;
  setEvaluation_good_count_parent: React.Dispatch<React.SetStateAction<number>>;
  comment_count_parent: number;
  setComment_count_parent: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_parent: number;
  setEvaluation_stay_count_parent: React.Dispatch<React.SetStateAction<number>>;
  start_index_children: number;
  setStart_index_children: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_count_children: number;
  setEvaluation_good_count_children: React.Dispatch<
    React.SetStateAction<number>
  >;
  comment_count_children: number;
  setComment_count_children: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_children: number;
  setEvaluation_stay_count_children: React.Dispatch<
    React.SetStateAction<number>
  >;
  start_index_main?: number;
  setStart_index_main?: React.Dispatch<React.SetStateAction<number>>;
  evaluation_good_count_main: number;
  setEvaluation_good_count_main: React.Dispatch<React.SetStateAction<number>>;
  comment_count_main: number;
  setComment_count_main: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count_main: number;
  setEvaluation_stay_count_main: React.Dispatch<React.SetStateAction<number>>;
  textCount: number;
}

export interface NovelProps {
  title: string;
  main_copy: string;
  overview: string;
  text: string;
  popular: boolean;
  newArrival: boolean;
  author_user_name: string;
  chips: React.ReactNode[];
  tags: React.ReactNode[];
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

// リクエスト用の新しい型
export interface CreateSentenceRequest {
  text: string;
}

// APIに送信するための型 (OpenAPI仕様に合わせる)
export interface PostSentence {
  parent_sentence_id: number;
  parent_updated_at: string;
  sentence: string;
}
