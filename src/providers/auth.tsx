import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi } from '../api/api';
import { AuthApi } from '../api/api';
import { axiosConfig } from '../axiosConfig';
import { withAuth } from '../api/functional';

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
  logout: () => void;
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

  const setLoginStatus = (status: 'checking' | 'success' | 'failure') => {
    sessionStorage.setItem('loginStatus', status);
  };

  const logout = async () => {
    try {
      await authApi.logOut({ withCredentials: true });
    } catch (e) {
      console.error('ログアウトAPI呼び出しでエラー:', e);
    }

    setLoginStatus('failure');
    setCurrentUser(null);
    sessionStorage.setItem('loginStatus', 'failure');
  };

  const fetchCurrentUserId = async () => {
    if (sessionStorage.getItem('loginStatus') !== 'checking') return;

    const getUserByMe = () => usersApi.getUserByMe({ withCredentials: true });
    const handleAuthFailure = () => logout();
    const response = await withAuth(getUserByMe, handleAuthFailure);

    if (response.data && response.data.user_id) {
      setLoginStatus('success');
      setCurrentUser(response.data as User);
      return;
    }
    throw new Error('No user_id');
  };

  useEffect(() => {
    setLoginStatus('checking');
    setCurrentUser(null);
    fetchCurrentUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ logout, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
