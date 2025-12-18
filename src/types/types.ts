// Custom types for the application

export interface CreateSentenceRequest {
  text: string;
  sentenceId: number;
}

// Navigation types
export type NavigationDirection = 'parent' | 'child' | 'next' | 'prev';
