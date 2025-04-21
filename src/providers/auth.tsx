import React, { createContext, useContext, useEffect, useState } from 'react';

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // URLからクエリパラメータを解析してトークンを取得
    const query = new URLSearchParams(window.location.search);
    const tokenFromUrl = query.get('token');

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      localStorage.setItem('authToken', tokenFromUrl); // トークンをlocalStorageに保存
    } else {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/api/v1/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          return response.json();
        })
        .then((data) => setCurrentUser(data.user))
        .catch((error) => {
          console.error('Error fetching user:', error);
          logout(); // エラー時にログアウト
        });
    }
  }, [token]);

  const logout = () => {
    setCurrentUser(null); // ユーザー情報をクリア
    setToken(''); // トークンをクリア
    localStorage.removeItem('authToken'); // localStorageからトークンを削除
  };

  return (
    <AuthContext.Provider
      value={{ token, logout, setToken, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};