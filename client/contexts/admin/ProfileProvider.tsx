'use client';

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import type { Profile } from '@/lib/admin/types';

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

const initialsOf = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user, ready } = useAuth();

  const profile = useMemo<Profile | null>(() => {
    if (!user) return null;
    return {
      id: user.id,
      name: user.fullName,
      username: `@${user.username}`,
      email: user.email,
      role: user.role === 'admin' ? 'Administrator' : 'User',
      initials: initialsOf(user.fullName),
      avatar: user.avatarUrl || '/images/admin/lina.jpg',
    };
  }, [user]);

  return (
    <ProfileContext.Provider value={{ profile, loading: !ready, error: null }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
};
