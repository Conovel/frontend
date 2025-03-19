import { useState, useEffect } from 'react';

// ユーザー情報の型
export interface UserProfile {
  username: string;
  bio?: string;
  avatarUrl?: string;
  selectedGenres?: string[];
  isAnonymous?: boolean;
  birthYearAndMonth?: Date;
}

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // 初期化時にLocalStorageからログイン状態を読み込む
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserProfile = localStorage.getItem('userProfile');

    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true);
    }

    if (storedUserProfile) {
      try {
        setUserProfile(JSON.parse(storedUserProfile));
      } catch (error) {
        console.error('Failed to parse user profile:', error);
        localStorage.removeItem('userProfile');
      }
    }
  }, []);

  // ログイン状態を設定する関数
  const login = (profile: UserProfile | null = null) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');

    if (profile) {
      setUserProfile(profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  };

  // ログアウト状態を設定する関数
  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
  };

  // プロフィール更新
  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  return {
    isLoggedIn,
    userProfile,
    login,
    logout,
    updateProfile,
  };
};
