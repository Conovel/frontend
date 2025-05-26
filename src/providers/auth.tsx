import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi } from '../api/api';
import { axiosConfig } from '../axiosConfig';

// 型定義
export interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  currentUserId: string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const usersApi = new UsersApi(axiosConfig);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string>('');

  const fetchCurrentUserId = async () => {
    try {
      const response = await usersApi.getCurrentUserId({
        withCredentials: true,
      });
      console.log('response:', response.data);

      // ユーザーIDを状態に設定
      setCurrentUserId(String(response.data.current_user_id ?? ''));
    } catch (error) {
      console.error('Error fetching user:', error);

      // エラー時にログアウト処理を実行
      logout();
    }
  };

  const logout = () => {
    setCurrentUserId(''); // ユーザー情報をクリア
    setToken(''); // トークンをクリア
    localStorage.removeItem('authToken'); // localStorageからトークンを削除
  };
  

  useEffect(() => {
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
