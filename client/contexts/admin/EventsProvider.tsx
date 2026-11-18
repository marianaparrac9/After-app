'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useAxios } from '@/contexts/AxiosProvider';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/contexts/ToastProvider';
import { getErrorMessage } from '@/lib/errors';
import { removeEvent, upsertEvent } from '@/lib/eventList';
import { EVENTS_CHANNEL, supabase } from '@/lib/supabase';
import { toAdminEvent } from '@/lib/admin/mappers';
import type { AfterEvent, EventStats } from '@/lib/admin/types';
import type { CreateEventForm, EventItem, EventStatus as ApiStatus } from '@/shared/models';

interface EventsContextType {
  events: AfterEvent[];
  stats: EventStats | null;
  loading: boolean;
  error: string | null;
  selectedEvent: AfterEvent | null;
  eventLoading: boolean;
  eventError: string | null;
  creating: boolean;
  updatingId: string | null;
  deletingId: string | null;
  loadEvent: (id: string) => Promise<void>;
  createEvent: (form: CreateEventForm) => Promise<boolean>;
  updateEventStatus: (id: string, status: ApiStatus) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType | null>(null);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isAdmin = user?.role === 'admin';
  const [items, setItems] = useState<EventItem[]>([]);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const { data } = await axios.get<EventStats>('/api/events/stats');
      setStats(data);
    } catch {
      setStats(null);
    }
  }, [axios]);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<EventItem[]>('/api/events');
      setItems((prev) => data.reduce(upsertEvent, prev.filter((item) => data.some((next) => next.id === item.id))));
      await loadStats();
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load events'));
    } finally {
      setLoading(false);
    }
  }, [axios, loadStats]);

  useEffect(() => {
    if (!isAdmin) {
      setItems([]);
      setStats(null);
      return;
    }

    const channel = supabase
      .channel(EVENTS_CHANNEL)
      .on('broadcast', { event: 'event-created' }, ({ payload }) => {
        setItems((prev) => upsertEvent(prev, payload as EventItem));
        void loadStats();
      })
      .on('broadcast', { event: 'event-updated' }, ({ payload }) => {
        setItems((prev) => upsertEvent(prev, payload as EventItem));
        void loadStats();
      })
      .on('broadcast', { event: 'event-deleted' }, ({ payload }) => {
        setItems((prev) => removeEvent(prev, (payload as { id: string }).id));
        void loadStats();
      })
      .subscribe();

    void loadEvents();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [isAdmin, loadEvents, loadStats]);

  const events = useMemo(() => items.map(toAdminEvent), [items]);
  const selectedEvent = useMemo(() => events.find((event) => event.id === selectedId) ?? null, [events, selectedId]);

  const loadEvent = useCallback(
    async (id: string) => {
      setSelectedId(id);
      setEventError(null);
      setEventLoading(true);
      try {
        const { data } = await axios.get<EventItem>(`/api/events/${id}`);
        setItems((prev) => upsertEvent(prev, data));
      } catch (err) {
        setEventError(getErrorMessage(err, 'Event not found'));
      } finally {
        setEventLoading(false);
      }
    },
    [axios]
  );

  const createEvent = async (form: CreateEventForm) => {
    setCreating(true);
    try {
      const { data } = await axios.post<EventItem>('/api/events', form);
      setItems((prev) => upsertEvent(prev, data));
      void loadStats();
      showToast(`${data.title} was created`, 'success');
      return true;
    } catch (err) {
      showToast(getErrorMessage(err, 'Could not create the event'), 'error');
      return false;
    } finally {
      setCreating(false);
    }
  };

  const updateEventStatus = async (id: string, status: ApiStatus) => {
    setUpdatingId(id);
    try {
      const { data } = await axios.patch<EventItem>(`/api/events/${id}`, { status });
      setItems((prev) => upsertEvent(prev, data));
      void loadStats();
      showToast(`${data.title} is now ${status}`, 'success');
    } catch (err) {
      showToast(getErrorMessage(err, 'Could not update the event'), 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteEvent = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/events/${id}`);
      setItems((prev) => removeEvent(prev, id));
      void loadStats();
      showToast('Event deleted', 'info');
    } catch (err) {
      showToast(getErrorMessage(err, 'Could not delete the event'), 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        stats,
        loading,
        error,
        selectedEvent,
        eventLoading,
        eventError,
        creating,
        updatingId,
        deletingId,
        loadEvent,
        createEvent,
        updateEventStatus,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEvents must be used within EventsProvider');
  return ctx;
};
