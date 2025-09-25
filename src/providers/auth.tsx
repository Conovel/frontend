import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi, AuthApi } from '../api/api';
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
  birthYearAndMonth: string;
  isAnonymous: boolean;
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
        // jwt, refresh両方失敗時にはlogin画面へリダイレクト
        console.log('認証に失敗しました。ログイン画面にリダイレクトします。');
        navigate('/login');
      });

      // 認証成功時には現在のユーザー情報を設定
      if (response?.data?.userId) {
        setCurrentUser(response.data as User);
        console.log('ユーザー情報を取得しました:', response.data);
        return;
      }
    } catch (error) {
      console.error('ユーザー情報の取得に失敗しました:', error);
      // エラーが発生した場合はモックユーザーを設定（開発用）
      const mockUser: User = {
        userId: 1,
        penName: 'テストユーザー',
        nickName: 'テスト',
        profileIconImage: '/path/to/avatar.jpg',
        evaluationGoodCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        birthYearAndMonth: '1990-01',
        isAnonymous: false,
      };
      setCurrentUser(mockUser);
      console.log('モックユーザーを設定しました:', mockUser);
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
