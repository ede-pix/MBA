'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole, MOCK_USERS } from '@/types/auth';

interface AuthContextType {
  user: User;
  switchRole: (role: UserRole) => void;
  isRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(MOCK_USERS.super_admin);

  const switchRole = useCallback((role: UserRole) => {
    setUser(MOCK_USERS[role]);
  }, []);

  const isRole = useCallback(
    (role: UserRole) => user.role === role,
    [user.role]
  );

  const hasAnyRole = useCallback(
    (roles: UserRole[]) => roles.includes(user.role),
    [user.role]
  );

  return (
    <AuthContext.Provider value={{ user, switchRole, isRole, hasAnyRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
