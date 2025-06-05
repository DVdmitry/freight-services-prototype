import { createContext } from 'react';
import type { User } from '@/shared/types/user';

export interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined); 