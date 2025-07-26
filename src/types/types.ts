// types.ts
import * as React from 'react';

export interface Sentence {
  titleId: number;
  title: string;
  mainCopy: string;
  overview: string;
  popular: boolean;
  newArrival: boolean;
  authorUserName: string;
  chips: { label: string }[];
  tags: { label: string }[];
  readerCount: number;
  avatar: {
    src: string;
    alt: string;
    color: string;
    text: string;
  };
  sentenceId: number;
  sentenceUserCount: number;
  sentenceHierarchyCount: number;
  sentence: string;
  textIndex: number;
  userId: number;
  userName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  evaluationStayCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ViewSentence {
  main: Sentence[];
  parent: Sentence[];
  parallels: Sentence[];
  children: Sentence[];
}

export interface NovelListItem {
  titleId: number;
  title: string;
  famousSentenceText: string;
  authorUserId: number;
  authorUserName: string;
  profileIconImage: string;
  titleGenres: string[];
  isNew: boolean;
  isFamous: boolean;
  viewCount: number;
  evaluationGoodCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface NovelDetail extends NovelListItem {
  mainCopy: string;
  sentenceUserCount: number;
  sentenceHierarchyCount: number;
  readerCount: number;
  overview: string;
}

export interface User {
  userId: number;
  userName: string;
  nickName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ViewMeUser extends User {
  birthYearAndMonth: string;
  isAnonymous: boolean;
}

export interface UpdateUser {
  userName: string;
  nickName: string;
  isAnonymous: boolean;
  profileIconImage: string;
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
  startIndexParent: number;
  setStartIndexParent: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountParent: number;
  setEvaluationGoodCountParent: React.Dispatch<React.SetStateAction<number>>;
  commentCountParent: number;
  setCommentCountParent: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountParent: number;
  setEvaluationStayCountParent: React.Dispatch<React.SetStateAction<number>>;
  startIndexChildren: number;
  setStartIndexChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountChildren: number;
  setEvaluationGoodCountChildren: React.Dispatch<React.SetStateAction<number>>;
  commentCountChildren: number;
  setCommentCountChildren: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountChildren: number;
  setEvaluationStayCountChildren: React.Dispatch<React.SetStateAction<number>>;
  startIndexMain?: number;
  setStartIndexMain?: React.Dispatch<React.SetStateAction<number>>;
  evaluationGoodCountMain: number;
  setEvaluationGoodCountMain: React.Dispatch<React.SetStateAction<number>>;
  commentCountMain: number;
  setCommentCountMain: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCountMain: number;
  setEvaluationStayCountMain: React.Dispatch<React.SetStateAction<number>>;
  textCount: number;
}

export interface NovelProps {
  titleId: number;
  title: string;
  mainCopy: string;
  overview: string;
  popular: boolean;
  newArrival: boolean;
  authorUserName: string;
  chips: { label: string }[];
  tags: { label: string }[];
  readerCount: number;
  avatar: {
    src: string;
    alt: string;
    color: string;
    text: string;
  };
  sentenceId: number;
  sentenceUserCount: number;
  sentenceHierarchyCount: number;
  sentence: string;
  textIndex: number;
  userId: number;
  userName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  evaluationStayCount: number;
  createdAt: string;
  updatedAt: string;
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
  parentSentenceId: number;
  parentUpdatedAt: string;
  sentence: string;
}

// ナビゲーション方向の型定義
export type NavigationDirection = 'prev' | 'next';
