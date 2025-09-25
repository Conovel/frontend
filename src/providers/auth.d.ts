import React from 'react';
export interface User {
  userId: number;
  penName: string;
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
export declare const useAuth: () => AuthContextType;
export declare const AuthProvider: React.FC<AuthProviderProps>;
