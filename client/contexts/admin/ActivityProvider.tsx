'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useAxios } from '@/contexts/AxiosProvider';
import { useAuth } from '@/contexts/AuthProvider';
import { getErrorMessage } from '@/lib/errors';
import { ACTIVITY_CHANNEL, supabase } from '@/lib/supabase';
import { toActivity } from '@/lib/admin/mappers';
import type { Activity } from '@/lib/admin/types';
import type { ActivityItem } from '@/shared/models';

interface ActivityContextType {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  eventActivities: Activity[];
  loadEventActivity: (eventId: string) => Promise<void>;
}

const ActivityContext = createContext<ActivityContextType | null>(null);

const prepend = (list: Activity[], item: Activity) =>
  list.some((activity) => activity.id === item.id) ? list : [item, ...list].slice(0, 20);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [activities, setActivities] = useState<Activity[]>([]);
  const eventIdRef = useRef<string | null>(null);
  const [eventActivities, setEventActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      setActivities([]);
      return;
    }

    const channel = supabase
      .channel(ACTIVITY_CHANNEL)
      .on('broadcast', { event: 'activity-created' }, ({ payload }) => {
        const item = toActivity(payload as ActivityItem);
        setActivities((prev) => prepend(prev, item));
        setEventActivities((prev) => (item.eventId === eventIdRef.current ? prepend(prev, item) : prev));
      })
      .subscribe();

    const onInit = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<ActivityItem[]>('/api/attendance/activity');
        setActivities((prev) => data.map(toActivity).reduceRight(prepend, prev));
      } catch (err) {
        setError(getErrorMessage(err, 'Could not load the activity'));
      } finally {
        setLoading(false);
      }
    };

    void onInit();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [axios, isAdmin]);

  const loadEventActivity = useCallback(
    async (id: string) => {
      eventIdRef.current = id;
      try {
        const { data } = await axios.get<ActivityItem[]>('/api/attendance/activity', { params: { eventId: id } });
        setEventActivities(data.map(toActivity));
      } catch (err) {
        setEventActivities([]);
        setError(getErrorMessage(err, 'Could not load the activity'));
      }
    },
    [axios]
  );

  return (
    <ActivityContext.Provider value={{ activities, loading, error, eventActivities, loadEventActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivity must be used within ActivityProvider');
  return ctx;
};
