'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { eventsCatalog } from '@/lib/events';
import type { AfterEvent, EventStats, EventStatus } from '@/lib/admin/types';
import type { EventItem } from '@/types/models';

interface EventsContextType {
  events: AfterEvent[];
  stats: EventStats | null;
  loading: boolean;
  error: string | null;
  selectedEvent: AfterEvent | null;
  eventLoading: boolean;
  eventError: string | null;
  loadEvent: (id: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType | null>(null);

const toStatus = (status: EventItem['status']): EventStatus => {
  if (status === 'live') return 'live';
  if (status === 'closed') return 'closed';
  return 'upcoming';
};

const toEvent = (item: EventItem): AfterEvent => {
  const [startTime, endTime] = item.displayTime.split(' - ');
  return {
    id: item.id,
    name: item.title,
    description: item.description,
    date: item.displayDate,
    startTime: startTime || item.displayTime,
    endTime: endTime || '',
    location: item.venueName,
    address: item.address,
    distance: `${item.distanceKm} km`,
    latitude: item.latitude,
    longitude: item.longitude,
    image: item.imageUrl,
    status: toStatus(item.status),
    attendees: item.occupied,
    capacity: item.capacity,
  };
};

// Los eventos salen del mismo catálogo que usa App User.
export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const events = useMemo(() => eventsCatalog.map(toEvent), []);

  const stats = useMemo<EventStats>(() => {
    const live = events.filter((event) => event.status === 'live');
    const peopleNow = live.reduce((sum, event) => sum + event.attendees, 0);
    const capacity = live.reduce((sum, event) => sum + event.capacity, 0);
    return {
      peopleNow,
      activeEvents: live.length,
      eventsToday: events.length,
      capacityPercent: capacity ? Math.round((peopleNow / capacity) * 100) : 0,
    };
  }, [events]);

  const [selectedEvent, setSelectedEvent] = useState<AfterEvent | null>(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState<string | null>(null);

  const loadEvent = useCallback(
    async (id: string) => {
      setEventLoading(true);
      setEventError(null);
      const found = events.find((event) => event.id === id) ?? null;
      setSelectedEvent(found);
      if (!found) setEventError('Event not found');
      setEventLoading(false);
    },
    [events]
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        stats,
        loading: false,
        error: null,
        selectedEvent,
        eventLoading,
        eventError,
        loadEvent,
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
