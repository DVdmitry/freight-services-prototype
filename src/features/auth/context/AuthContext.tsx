import React, { useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/shared/types/user'; 
import { mockUser as defaultMockUser } from '@/shared/mocks/user';
import { AuthContext, type AuthContextType } from '../auth-def'; // Импортируем из нового файла

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = useCallback((email: string) => {
    if (email === 'admin@example.com') {
      const adminUserData: User = { ...defaultMockUser, email, isAdmin: true, name: 'Admin User' };
      setUser(adminUserData);
      setIsAdmin(true);
    } else {
      const regularUserData: User = { ...defaultMockUser, email, isAdmin: false, name: email.split('@')[0] };
      setUser(regularUserData);
      setIsAdmin(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
  }, []);

  const contextValue: AuthContextType = useMemo(() => ({
    user,
    isAdmin,
    login,
    logout,
  }), [user, isAdmin, login, logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}; 