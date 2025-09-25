import {
  NovelListItem as ApiNovel,
  NovelDetail as ApiNovelDetail,
  Sentence as ApiSentence,
  User as ApiUser,
  ViewSentence as ApiViewSentence,
} from '../../api';

export interface SafeNovel {
  novelId: string;
  title: string;
  description: string;
  authorName: string;
  authorId: string;
  tags: string[];
  likeCount: number;
  viewCount: number;
  postType: 'SEQUENTIAL' | 'TREE';
  createdAt: string;
  updatedAt: string;
}

export interface SafeSentence {
  sentenceId: string;
  novelId: string;
  sentence: string;
  parentSentenceId?: string;
  userId: string;
  userName: string;
  likeCount: number;
  position?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SafeUser {
  userId: string;
  username: string;
  email?: string;
  profileImageUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export class ApiConverters {
  static toSafeNovel(apiNovel: ApiNovel): SafeNovel {
    return {
      novelId: String(apiNovel.titleId || ''),
      title: apiNovel.title || '無題',
      description: apiNovel.famousSentenceText || '',
      authorName: apiNovel.authorPenName || '名無し',
      authorId: String(apiNovel.authorUserId || ''),
      tags: Array.isArray(apiNovel.titleGenres) ? apiNovel.titleGenres : [],
      likeCount:
        typeof apiNovel.evaluationGoodCount === 'number'
          ? apiNovel.evaluationGoodCount
          : 0,
      viewCount:
        typeof apiNovel.viewCount === 'number' ? apiNovel.viewCount : 0,
      postType: 'SEQUENTIAL', // API仕様にpostTypeが存在しないため固定値
      createdAt: apiNovel.createdAt || new Date().toISOString(),
      updatedAt: apiNovel.updatedAt || new Date().toISOString(),
    };
  }

  static toSafeSentence(apiSentence: ApiSentence): SafeSentence {
    return {
      sentenceId: String(apiSentence.sentenceId || ''),
      novelId: '', // API仕様に存在しないため空文字
      sentence: apiSentence.sentence || '',
      parentSentenceId: undefined, // API仕様に存在しないため未定義
      userId: String(apiSentence.sentenceUserId || ''),
      userName: apiSentence.sentencePenName || '名無し',
      likeCount:
        typeof apiSentence.evaluationGoodCount === 'number'
          ? apiSentence.evaluationGoodCount
          : 0,
      position: undefined, // API仕様に存在しないため未定義
      createdAt: apiSentence.createdAt || new Date().toISOString(),
      updatedAt: apiSentence.updatedAt || new Date().toISOString(),
    };
  }

  static toSafeUser(apiUser: ApiUser): SafeUser {
    return {
      userId: String(apiUser.userId || ''),
      username: apiUser.penName || '名無しユーザー',
      email: undefined, // API仕様に存在しないため未定義
      profileImageUrl: apiUser.profileIconImage,
      bio: undefined, // API仕様に存在しないため未定義
      createdAt: apiUser.createdAt || new Date().toISOString(),
      updatedAt: apiUser.updatedAt || new Date().toISOString(),
    };
  }

  static toSafeNovelDetail(apiNovelDetail: ApiNovelDetail): SafeNovel {
    return {
      novelId: String(apiNovelDetail.titleId || ''),
      title: apiNovelDetail.title || '無題',
      description: apiNovelDetail.famousSentenceText || '',
      authorName: apiNovelDetail.authorPenName || '名無し',
      authorId: String(apiNovelDetail.authorUserId || ''),
      tags: Array.isArray(apiNovelDetail.titleGenres)
        ? apiNovelDetail.titleGenres
        : [],
      likeCount:
        typeof apiNovelDetail.evaluationGoodCount === 'number'
          ? apiNovelDetail.evaluationGoodCount
          : 0,
      viewCount:
        typeof apiNovelDetail.viewCount === 'number'
          ? apiNovelDetail.viewCount
          : 0,
      postType: 'SEQUENTIAL', // API仕様にpostTypeが存在しないため固定値
      createdAt: apiNovelDetail.createdAt || new Date().toISOString(),
      updatedAt: apiNovelDetail.updatedAt || new Date().toISOString(),
    };
  }

  static toSafeNovelList(apiNovels: ApiNovel[]): SafeNovel[] {
    if (!Array.isArray(apiNovels)) return [];
    return apiNovels.map((novel) => ApiConverters.toSafeNovel(novel));
  }

  static toSafeViewSentence(apiViewSentence: ApiViewSentence): SafeSentence {
    // ViewSentenceのmainフィールドからSentenceを抽出
    const mainSentence = apiViewSentence.main;
    if (!mainSentence) {
      throw new Error('ViewSentence main is required');
    }
    return ApiConverters.toSafeSentence(mainSentence);
  }

  static toSafeSentenceList(apiSentences: ApiSentence[]): SafeSentence[] {
    if (!Array.isArray(apiSentences)) return [];
    return apiSentences.map((sentence) =>
      ApiConverters.toSafeSentence(sentence),
    );
  }
}

export type ResponseValidator<T> = (data: unknown) => T;

export const validators = {
  isNovel: (data: unknown): data is ApiNovel => {
    if (!data || typeof data !== 'object') return false;
    const novel = data as Record<string, unknown>;
    return typeof novel.titleId === 'number' && typeof novel.title === 'string';
  },

  isSentence: (data: unknown): data is ApiSentence => {
    if (!data || typeof data !== 'object') return false;
    const sentence = data as Record<string, unknown>;
    return (
      typeof sentence.sentenceId === 'number' &&
      typeof sentence.sentence === 'string'
    );
  },

  isUser: (data: unknown): data is ApiUser => {
    if (!data || typeof data !== 'object') return false;
    const user = data as Record<string, unknown>;
    return typeof user.userId === 'number' && typeof user.penName === 'string';
  },

  isNovelArray: (data: unknown): data is ApiNovel[] => {
    if (!Array.isArray(data)) return false;
    return data.every((item) => validators.isNovel(item));
  },

  isSentenceArray: (data: unknown): data is ApiSentence[] => {
    if (!Array.isArray(data)) return false;
    return data.every((item) => validators.isSentence(item));
  },

  isNovelDetail: (data: unknown): data is ApiNovelDetail => {
    if (!data || typeof data !== 'object') return false;
    const novelDetail = data as Record<string, unknown>;
    return (
      typeof novelDetail.titleId === 'number' &&
      typeof novelDetail.title === 'string'
    );
  },
};
