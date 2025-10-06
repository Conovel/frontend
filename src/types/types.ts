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
import type { Sentence, NovelListItem } from '../api/api';

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

// Novel list item type (for novel list display, no relationships needed)
export interface NovelListItemWithUI extends NovelListItem {
  // UI-specific additional fields for novel list
  avatar?: Avatar;
  chips?: Chip[];
  tags?: Chip[];
  readerCount?: number;
  sentenceUserCount?: number;
  sentenceHierarchyCount?: number;
  mainCopy?: string;
  popular?: boolean;
  newArrival?: boolean;
}

// API request types (re-exported from API)
export type { PostSentence } from '../api/api';

export interface CreateSentenceRequest {
  text: string;
  sentenceId: number;
}

// Navigation types
export type NavigationDirection = 'parent' | 'child' | 'next' | 'prev';
