// Avatar type
export interface Avatar {
  src: string;
  alt: string;
  color: string;
  text: string;
}

// Chip/Tag type
export interface Chip {
  label: string;
}

// Base Sentence type (matches OpenAPI specification)
export interface Sentence {
  sentenceId: number;
  sentence: string;
  sentenceUserId: number;
  sentenceUserName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  evaluationStayCount: number;
  createdAt: string;
  updatedAt: string;
  // Additional fields for UI compatibility (optional)
  titleId?: number;
  title?: string;
  textIndex?: number;
  overview?: string;
  popular?: boolean;
  newArrival?: boolean;
  avatar?: Avatar;
  authorUserName?: string;
  chips?: Chip[];
  tags?: Chip[];
  readerCount?: number;
  sentenceUserCount?: number;
  sentenceHierarchyCount?: number;
  mainCopy?: string;
  userId?: number;
  userName?: string;
}

// NovelProps extends Sentence and includes relationships
export interface NovelProps extends Sentence {
  children: Sentence[];
  parent: NovelProps[];
  main: Sentence[];
}

// NovelListItem type for the novel list API response
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

// NovelDetail type (if needed for other components)
export interface NovelDetail {
  titleId: number;
  title: string;
  mainCopy: string;
  overview: string;
  isFamous: boolean;
  isNew: boolean;
  profileIconImage: string;
  authorPenName: string;
  titleGenres: string[];
  readerCount: number;
  updatedAt: string;
  sentenceUserCount: number;
  sentenceHierarchyCount: number;
  createdAt: string;
  authorUserId: number;
  evaluationGoodCount: number;
}

// API request types
export interface PostSentence {
  sentence: string;
  parentSentenceId: number;
  parentUpdatedAt: string;
}

export interface CreateSentenceRequest {
  text: string;
  sentenceId: number;
}

// Navigation types
export type NavigationDirection = 'parent' | 'child' | 'next' | 'prev';

// Component Props types
export interface NovelCardProps {
  novel: NovelProps;
  evaluation_good_count: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
  textIndex: number;
  numberOfPostParallelStory: number;
  getParallels: () => void;
  parallels: Sentence[];
  setParallels: React.Dispatch<React.SetStateAction<Sentence[]>>;
  sentencePenName: string;
}

export interface ThumbUpButtonProps {
  evaluation_good_count: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface CommentButtonProps {
  comment_count: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface NextPlanButtonProps {
  evaluation_stay_count: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
}
