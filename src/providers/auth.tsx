import React, { createContext, useContext, useEffect, useState } from 'react';

import { UsersApi } from '../api/api';
import { AuthApi } from '../api/api';
import { axiosConfig } from '../axiosConfig';
import { withAuth, subscribeToAuthStatus, getLoginStatus, resetAuthStatus, LoginStatus } from '../api/functional';

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

  // loginStatusはfunctional.tsで管理するのでsessionStorageは不要
  // ただし、もともとのsetLoginStatusのインターフェースは維持
  const setLoginStatus = (status: LoginStatus) => {
    // 互換のため。UI用state管理はfunctional.ts側
    // sessionStorage.setItem('loginStatus', status); // 不要
    // functional.tsで管理されるため何もせず
  };

  const logout = async () => {
    try {
      await authApi.logOut();
    } catch (e) {
      console.error('ログアウトAPI呼び出しでエラー:', e);
    }
    resetAuthStatus(); // functional.tsでloginStatusをidleに戻す
    setCurrentUser(null);
    // sessionStorage.setItem('loginStatus', 'failure'); // 不要
  };
  
  const getUserByMe = () => usersApi.getUserByMe();

  const fetchCurrentUserId = async () => {
    // functional.tsの状態を参照
    if (getLoginStatus() !== 'idle') return;

    // logout自体がasync functionなのでそのまま渡す
    const response = await withAuth(getUserByMe, logout);

    if (response?.data?.user_id) {
      // setLoginStatus('success'); // 管理はfunctional.ts側
      setCurrentUser(response.data as User);
      return;
    }
    // TODO: 認証エラー時の画面遷移などを記載すること！
  };

  useEffect(() => {
    // functional.tsでloginStatusを初期化（idle）
    resetAuthStatus(); // 必要に応じてloginStatusを初期化
    // 📌 重要：unsubscribe関数を受け取る
    const unsubscribe = subscribeToAuthStatus((status) => {
      // 必要に応じて状態変更時の処理を追加
      console.log('Auth status changed:', status);
    });
    setCurrentUser(null);
    fetchCurrentUserId();
    
    // 📌 重要：クリーンアップ関数でunsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logout, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
