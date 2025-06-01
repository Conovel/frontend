import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi } from '../api/api';
import { AuthApi } from '../api/api';
import { axiosConfig } from '../axiosConfig';

// 型定義
export interface AuthContextType {
  currentUserId: string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
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
  const [currentUserId, setCurrentUserId] = useState<string>('');

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
    setCurrentUserId('');
    sessionStorage.setItem('loginStatus', 'failure');
  };

  const fetchCurrentUserId = async () => {
    if (sessionStorage.getItem('loginStatus') !== 'checking') return;

    try {
      const response = await usersApi.getUserByMe({ withCredentials: true });
      if (response.data && response.data.user_id) {
        setLoginStatus('success');
        setCurrentUserId(String(response.data.user_id));
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
        setCurrentUserId(String(retryResponse.data.user_id));
        return;
      } catch (refreshError) {
        await logout();
      }
    }
  };

  useEffect(() => {
    setLoginStatus('checking');
    setCurrentUserId('');
    fetchCurrentUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ logout, currentUserId, setCurrentUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
