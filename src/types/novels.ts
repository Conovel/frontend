/**
 * 小説
 */
export interface Novel {
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

/**
 * 小説の概要
 */
export interface NovelDetail extends Novel {
  mainCopy: string;
  sentenceUserCount: number;
  sentenceHierarchyCount: number;
  readerCount: number;
  overview: string;
}
