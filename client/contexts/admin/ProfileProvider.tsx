'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Profile } from '@/lib/admin/types';

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const adminProfile: Profile = {
  id: 1,
  name: 'Lina Sanchez',
  username: '@lina.sanchez',
  email: 'lina.sanchez@after.com',
  role: 'Administrator',
  initials: 'LS',
  avatar: '/images/admin/lina.jpg',
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProfileContext.Provider value={{ profile: adminProfile, loading: false, error: null }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
};
