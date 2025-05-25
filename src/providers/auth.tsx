import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi } from '../api/api';
import { axiosConfig } from '../axiosConfig';

// 型定義
export interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

// 環境変数からAPI URLを取得
const API_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const usersApi = new UsersApi(axiosConfig);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const logout = () => {
  setCurrentUser(null); // ユーザー情報をクリア
  setToken(''); // トークンをクリア
  localStorage.removeItem('authToken'); // localStorageからトークンを削除
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // クッキーからトークンを取得するヘルパー関数
  // const getCookie = (name: string): string | null => {
  //   const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  //   return match ? decodeURIComponent(match[2]) : null;
  // };

  useEffect(() => {
    // クッキーからトークンを取得
    // const tokenFromCookie = getCookie('jwt_token');
    // console.log('All cookies:', document.cookie);
    // console.log('Token from cookie:', tokenFromCookie);

    // if (tokenFromCookie) {
    //   setToken(tokenFromCookie);
    // } else {
    //   const storedToken = localStorage.getItem('authToken');
    //   if (storedToken) {
    //     setToken(storedToken);
    //   }
    // }

    const fetchCurrentUserId = async () => {
      try {
        // `usersApi.getCurrentUserId` を呼び出してデータを取得
        const response = await usersApi.getCurrentUserId();
        console.log('response:', response.data);
  
        // ユーザーIDを状態に設定
        setCurrentUserId(response.data.user_id);
      } catch (error) {
        console.error('Error fetching user:', error);
  
        // エラー時にログアウト処理を実行
        logout();
      }
    };
  
    fetchCurrentUserId();
  }, []);

  

  return (
    <AuthContext.Provider
      value={{ token, logout, setToken, currentUserId, setCurrentUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
