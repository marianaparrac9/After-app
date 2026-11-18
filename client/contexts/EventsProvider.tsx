"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useAxios } from "./AxiosProvider";
import { useAuth } from "./AuthProvider";
import { EventFilters, EventItem } from "@/shared/models";
import { getErrorMessage } from "@/lib/errors";
import { matchesFilters, removeEvent, upsertEvent } from "@/lib/eventList";
import { EVENTS_CHANNEL, supabase } from "@/lib/supabase";

export const defaultFilters: EventFilters = {
  search: "",
  category: "all",
  status: "all",
  time: "all",
  maxDistance: 5,
};

interface EventsContextType {
  allEvents: EventItem[];
  events: EventItem[];
  filters: EventFilters;
  loading: boolean;
  error: string;
  setFilters: (next: Partial<EventFilters>) => void;
  resetFilters: () => void;
  getEventById: (id: string) => EventItem | null;
  reloadEvents: () => Promise<void>;
  applyEvent: (event: EventItem) => void;
}

const EventsContext = createContext<EventsContextType | null>(null);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const { user } = useAuth();
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [filters, setFiltersState] = useState<EventFilters>(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reloadEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get<EventItem[]>("/api/events");
      setAllEvents((prev) => data.reduce(upsertEvent, prev.filter((item) => data.some((next) => next.id === item.id))));
    } catch (err) {
      setError(getErrorMessage(err, "Could not load events"));
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    if (!user || user.role !== "user") {
      setAllEvents([]);
      return;
    }

    const channel = supabase
      .channel(EVENTS_CHANNEL)
      .on("broadcast", { event: "event-created" }, ({ payload }) => {
        setAllEvents((prev) => upsertEvent(prev, payload as EventItem));
      })
      .on("broadcast", { event: "event-updated" }, ({ payload }) => {
        setAllEvents((prev) => upsertEvent(prev, payload as EventItem));
      })
      .on("broadcast", { event: "event-deleted" }, ({ payload }) => {
        setAllEvents((prev) => removeEvent(prev, (payload as { id: string }).id));
      })
      .subscribe();

    void reloadEvents();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user, reloadEvents]);

  const events = useMemo(() => allEvents.filter((item) => matchesFilters(item, filters)), [allEvents, filters]);

  const setFilters = (next: Partial<EventFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...next }));
  };

  const resetFilters = () => setFiltersState(defaultFilters);

  const getEventById = (id: string) => allEvents.find((item) => item.id === id) || null;

  const applyEvent = (event: EventItem) => setAllEvents((prev) => upsertEvent(prev, event));

  return (
    <EventsContext.Provider
      value={{
        allEvents,
        events,
        filters,
        loading,
        error,
        setFilters,
        resetFilters,
        getEventById,
        reloadEvents,
        applyEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used within EventsProvider");
  return ctx;
};
