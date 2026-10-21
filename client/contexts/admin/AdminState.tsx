'use client';

import type { ReactNode } from 'react';
import { ActivityProvider } from './ActivityProvider';
import { EventsProvider } from './EventsProvider';
import { ProfileProvider } from './ProfileProvider';

export const AdminState = ({ children }: { children: ReactNode }) => {
  return (
    <EventsProvider>
      <ActivityProvider>
        <ProfileProvider>
          <div className="admin-app">{children}</div>
        </ProfileProvider>
      </ActivityProvider>
    </EventsProvider>
  );
};
