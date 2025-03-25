import React from 'react';

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