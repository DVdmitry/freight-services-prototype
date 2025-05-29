import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react'; // ReactNode теперь импортируется как тип
import type { User } from '@/shared/types/user'; // User теперь импортируется как тип
import { mockUser as defaultMockUser } from '@/shared/mocks/user'; // Переименовываем для ясности

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = useCallback((email: string) => {
    // В реальном приложении здесь будет вызов API
    if (email === 'admin@example.com') {
      const adminUserData: User = { ...defaultMockUser, email, isAdmin: true, name: 'Admin User' };
      setUser(adminUserData);
      setIsAdmin(true);
    } else {
      const regularUserData: User = { ...defaultMockUser, email, isAdmin: false, name: email.split('@')[0] }; // Простое имя из email
      setUser(regularUserData);
      setIsAdmin(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    // В реальном приложении здесь может быть вызов API для выхода
  }, []);

  const contextValue = useMemo(() => ({
    user,
    isAdmin,
    login,
    logout,
  }), [user, isAdmin, login, logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}; 