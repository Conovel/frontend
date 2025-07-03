import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi } from '../api/api';
import { AuthApi } from '../api/api';
import { axiosConfig } from '../axiosConfig';
import { useNavigate } from 'react-router';

// 型定義
export interface User {
  user_id: number;
  user_name: string;
  nick_name: string;
  profile_icon_image: string;
  evaluation_good_count: number;
  created_at: string;
  updated_at: string;
  birth_year_and_month: string;
  is_anonymous: boolean;
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
    const response = await usersApi.getUserByMe(async () => {
      // jwt, refresh両方失敗時にはlgin画面へリダイレクト
      navigate('/login');
    });

    // 認証成功時には現在のユーザー情報を設定
    if (response?.data?.user_id) {
      setCurrentUser(response.data as User);
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
