import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi } from '../api/api';
import { AuthApi } from '../api/api';
import { axiosConfig } from '../axiosConfig';

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

// TODO:
// current_user_idは不要
// users_meを叩いて情報をコンテキストで渡す
// APIを叩いた時点でログインしてないことに気づいてフロント側で動きを変える

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const setLoginStatus = (status: 'checking' | 'success' | 'failure') => {
    sessionStorage.setItem('loginStatus', status);
  };

  const logout = async () => {
    try {
      // AuthApiのlogOutを実行
      const logOutFunc = await authApi.logOut({ withCredentials: true });
      if (logOutFunc.status === 200) {
        // ループ防止: 'checking' の時だけ再実行
        if (sessionStorage.getItem('loginStatus') === 'checking') {
          // ログアウト成功時の処理
        }
      }
    } catch (e) {
      console.error('ログアウトAPI呼び出しでエラー:', e);
    }

    setLoginStatus('failure');
    setCurrentUser(null);
    sessionStorage.setItem('loginStatus', 'failure');
  };

  const fetchCurrentUserId = async () => {
    if (sessionStorage.getItem('loginStatus') !== 'checking') return;

    try {
      const response = await usersApi.getUserByMe({ withCredentials: true });
      if (response.data && response.data.user_id) {
        setLoginStatus('success');
        setCurrentUser(response.data as User); 
        return;
      }
      throw new Error('No current_user_id');
    } catch (error) {
      setLoginStatus('failure');
      try {
        const refreshRes = await authApi.refreshToken({
          withCredentials: true,
        });
        if (refreshRes.status !== 200) {
          throw new Error('Refresh failed');
        }

        setLoginStatus('checking');
        const retryResponse = await usersApi.getUserByMe({
          withCredentials: true,
        });
        if (!(retryResponse.data && retryResponse.data.user_id)) {
          throw new Error('No user_id after refresh');
        }

        setLoginStatus('success');
        setCurrentUser(retryResponse.data as User);
        return;
      } catch (refreshError) {
        await logout();
      }
    }
  };

  useEffect(() => {
    setLoginStatus('checking');
    setCurrentUser(null);
    fetchCurrentUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ logout, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
