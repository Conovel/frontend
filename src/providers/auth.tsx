import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AxiosError } from 'axios';

import { UsersApi, AuthApi, type ErrorResponse } from '../api/api';
import { axiosConfig } from '../axiosConfig';
import { useNavigate } from 'react-router';

// 型定義
export interface User {
  userId: number;
  penName: string;
  nickName: string;
  profileIconImage: string;
  evaluationGoodCount: number;
  createdAt: string;
  updatedAt: string;
  birthYm: string;
  isAnonymous: boolean;
  agreedTermsVersion: number;
}

export interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const usersApi = new UsersApi(axiosConfig);
const authApi = new AuthApi(axiosConfig);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authApi.logOut();
    } catch (e) {
      console.error('ログアウトAPI呼び出しでエラー:', e);
    }
    setCurrentUser(null);
  };

  const fetchCurrentUserId = async () => {
    try {
      const response = await usersApi.getUserByMe(async () => {
        // jwt, refresh両方失敗時にはログイン画面へリダイレクト
        navigate('/login');
      });

      // 認証成功時には現在のユーザー情報を設定
      if (response?.data?.userId) {
        setCurrentUser(response.data as User);
        return;
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const apiError = axiosError.response?.data?.error;
      console.error('ユーザー情報の取得に失敗しました:', apiError ?? error);

      if (import.meta.env.DEV) {
        const mockUser: User = {
          userId: 1,
          penName: 'テストユーザー',
          nickName: 'テスト',
          profileIconImage: '/path/to/avatar.jpg',
          evaluationGoodCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          birthYm: '1990/01',
          isAnonymous: false,
          agreedTermsVersion: 1,
        };
        setCurrentUser(mockUser);
      }
    }
  };

  useEffect(() => {
    // 初期化時に現在のユーザー情報を取得
    fetchCurrentUserId();
  }, []);

  return (
    <AuthContext.Provider value={{ logout, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
