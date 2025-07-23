import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi, AuthApi } from '../api/api';
import { axiosConfig } from '../axiosConfig';
import { useNavigate, useLocation } from 'react-router';
import { useLastVisitedPage } from '../hooks/useLastVisitedPage';

// 型定義
export interface User {
  userId: number;
  userName: string;
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
  const location = useLocation();
  const { navigateToLastVisitedPage } = useLastVisitedPage();

  const logout = async () => {
    try {
      await authApi.logOut();
    } catch (e) {
      console.error('ログアウトAPI呼び出しでエラー:', e);
    }
    setCurrentUser(null);
  };

  const fetchCurrentUserId = async () => {
    const response = await usersApi.getUserByMe(async () => {
      // jwt, refresh両方失敗時にはlgin画面へリダイレクト
      navigate('/login');
    });

    // 認証成功時には現在のユーザー情報を設定
    if (response?.data?.userId) {
      setCurrentUser(response.data as User);

      // ログインページから来た場合は、前回訪問したページに遷移
      if (location.pathname === '/login') {
        navigateToLastVisitedPage();
      }
      return;
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
