// Re-export OpenAPI generated types
export type {
  Sentence,
  NovelDetail,
  NovelListItem,
  EvaluateSentence,
  ViewEvaluation,
  ViewSentence,
  User,
  ViewMeUser,
  UpdateUser,
} from '../api/api';

// API request types (re-exported from API)
export type { PostSentence } from '../api/api';

export interface CreateSentenceRequest {
  text: string;
  sentenceId: number;
}

// Navigation types
export type NavigationDirection = 'parent' | 'child' | 'next' | 'prev';
