/**
 * 小説
 */
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

/**
 * 小説の概要
 */
export interface NovelDetail extends NovelListItem {
  mainCopy: string;
  sentenceUserCount: number;
  sentenceHierarchyCount: number;
  readerCount: number;
  overview: string;
}
