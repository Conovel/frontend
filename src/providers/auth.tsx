import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi } from '../api/api';
import { AuthApi } from '../api/api';
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
// tokenのフックはアクセスできないので不要
// APIを叩いた時点でログインしてないことに気づいてフロント側で動きを変える

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
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
    setToken('');
    localStorage.removeItem('authToken');
    sessionStorage.setItem('loginStatus', 'failure');
  };

  const fetchCurrentUserId = async () => {
    // ループ防止: 'checking' の時だけ実行
    if (sessionStorage.getItem('loginStatus') !== 'checking') return;
  
    try {
      const response = await usersApi.getCurrentUserId({ withCredentials: true });
      if (response.data && response.data.current_user_id) {
        setLoginStatus('success');
        setCurrentUserId(String(response.data.current_user_id));
        return;
      }
      throw new Error('No current_user_id');
    } catch (error) {
      // current_user_id取得失敗→トークンリフレッシュ
      try {
        const refreshRes = await authApi.refreshToken({ withCredentials: true });
        if (refreshRes.status === 200) {
          // ループ防止: 'checking' の時だけ再実行
          if (sessionStorage.getItem('loginStatus') === 'checking') {
            await fetchCurrentUserId();
            return;
          }
        }
        logout();
      } catch (refreshError) {
        logout();
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
      value={{ token, logout, setToken, currentUserId, setCurrentUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
