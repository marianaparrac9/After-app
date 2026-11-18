'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { PrivateRoute } from '@/components/PrivateRoute/PrivateRoute';
import { ActivityProvider } from './ActivityProvider';
import { EventsProvider } from './EventsProvider';
import { ProfileProvider } from './ProfileProvider';

const PUBLIC_PATHS = ['/admin/login', '/admin/register'];

export const AdminState = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isPublic = PUBLIC_PATHS.includes(pathname);

  return (
    <EventsProvider>
      <ActivityProvider>
        <ProfileProvider>
          <div className="admin-app">
            {isPublic ? (
              children
            ) : (
              <PrivateRoute role="admin" redirectTo="/admin/login">
                {children}
              </PrivateRoute>
            )}
          </div>
        </ProfileProvider>
      </ActivityProvider>
    </EventsProvider>
  );
};
