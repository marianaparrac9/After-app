'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { eventsCatalog } from '@/lib/events';
import type { Activity } from '@/lib/admin/types';

interface ActivityContextType {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  eventActivities: Activity[];
  loadEventActivity: (eventId: string) => Promise<void>;
}

const ActivityContext = createContext<ActivityContextType | null>(null);

const fromCatalog = (): Activity[] =>
  eventsCatalog.map((item, index) => ({
    id: index + 1,
    eventId: item.id,
    time: item.displayTime.split(' - ')[0] || item.displayTime,
    message:
      item.status === 'live'
        ? `${item.title} is live at ${item.venueName}`
        : `${item.occupied} people at ${item.title}`,
  }));

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const activities = useMemo(() => fromCatalog(), []);
  const [eventActivities, setEventActivities] = useState<Activity[]>([]);

  const loadEventActivity = useCallback(async (eventId: string) => {
    setEventActivities(activities.filter((item) => item.eventId === eventId));
  }, [activities]);

  return (
    <ActivityContext.Provider
      value={{
        activities,
        loading: false,
        error: null,
        eventActivities,
        loadEventActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivity must be used within ActivityProvider');
  return ctx;
};
