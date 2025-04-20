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
}

export interface ViewSentence {
  main: Sentence;
  parent: Sentence;
  parallels: Sentence[];
  children: Sentence[];
}
