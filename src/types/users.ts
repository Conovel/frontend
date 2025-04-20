export interface User {
  userId: number;
  userName: string;
  nickName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 自分自身のアカウント情報
 */
export interface ViewMeUser extends User {
  birthYearAndMonth: string;
  isAnonymous: boolean;
}

/**
 * 自分自身のアカウント情報更新
 */
export interface UpdateUser {
  userName: string;
  nickName: string;
  isAnonymous: boolean;
  profileIconImage: string;
}
