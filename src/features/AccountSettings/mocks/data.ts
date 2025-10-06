import { ViewMeUser } from '../../../api/api';

// アカウント設定用のモックデータ
export const mockUserData: ViewMeUser = {
  userId: 1,
  penName: '花子花花花花花花花花花花花花花花花花花花花花花花花花花花３２文字',
  nickName: 'HANAAAAAAAAAAAAAAAAAAAAAAAAA32文字',
  profileIconImage: '/path/to/profile-icon.jpg',
  evaluationGoodCount: 100,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  birthYm: '1998/02',
  isAnonymous: false,
};

// エラー時のフォールバックデータ
export const fallbackUserData: ViewMeUser = {
  userId: 1,
  penName: 'デフォルトユーザー',
  nickName: 'DefaultUser',
  profileIconImage: '',
  evaluationGoodCount: 0,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  birthYm: '1990/01',
  isAnonymous: false,
};
