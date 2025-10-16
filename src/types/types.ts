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

// Import types for use in interfaces
import type { Sentence } from '../api/api';

// UI-specific types
export interface Avatar {
  src: string;
  alt: string;
  color: string;
  text: string;
}

export interface Chip {
  label: string;
}

// Extended Sentence type for UI with additional fields
export interface SentenceWithUI extends Sentence {
  // UI-specific additional fields
  textIndex?: number;
  avatar?: Avatar;
  authorUserName?: string;
  chips?: Chip[];
  tags?: Chip[];
  userName?: string;
}

// Novel view type with relationships (only for novel view, not for novel list)
export interface NovelViewData extends SentenceWithUI {
  children: SentenceWithUI[];
  parent: SentenceWithUI[];
  main: SentenceWithUI[];
}

// API request types (re-exported from API)
export type { PostSentence } from '../api/api';

export interface CreateSentenceRequest {
  text: string;
  sentenceId: number;
}

// Navigation types
export type NavigationDirection = 'parent' | 'child' | 'next' | 'prev';
