"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useAxios } from "./AxiosProvider";
import { useAuth } from "./AuthProvider";
import { useEvents } from "./EventsProvider";
import { useToast } from "./ToastProvider";
import { EventItem, SavedEvent } from "@/shared/models";
import { getErrorMessage } from "@/lib/errors";

interface SavedContextType {
  savedIds: string[];
  savedEvents: EventItem[];
  loading: boolean;
  savingId: string | null;
  error: string;
  toggleSaved: (eventId: string) => Promise<void>;
}

const SavedContext = createContext<SavedContextType | null>(null);

export const SavedProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const { user } = useAuth();
  const { allEvents } = useEvents();
  const { showToast } = useToast();
  const [saved, setSaved] = useState<SavedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadSaved = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get<SavedEvent[]>("/api/saved");
      setSaved(data);
    } catch (err) {
      setError(getErrorMessage(err, "Could not load your saved events"));
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    if (!user || user.role !== "user") {
      setSaved([]);
      return;
    }
    void loadSaved();
  }, [user, loadSaved]);

  const savedIds = useMemo(() => saved.map((item) => item.event.id), [saved]);

  const savedEvents = useMemo(
    () =>
      saved
        .map((item) => allEvents.find((event) => event.id === item.event.id) || item.event)
        .filter((event) => allEvents.length === 0 || allEvents.some((item) => item.id === event.id)),
    [saved, allEvents]
  );

  const toggleSaved = async (eventId: string) => {
    if (savingId) return;
    setSavingId(eventId);
    try {
      if (savedIds.includes(eventId)) {
        await axios.delete(`/api/saved/${eventId}`);
        setSaved((prev) => prev.filter((item) => item.event.id !== eventId));
        showToast("Removed from saved events", "info");
      } else {
        const { data } = await axios.post<SavedEvent[]>(`/api/saved/${eventId}`);
        setSaved(data);
        showToast("Event saved", "success");
      }
    } catch (err) {
      showToast(getErrorMessage(err, "Could not update saved events"), "error");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <SavedContext.Provider value={{ savedIds, savedEvents, loading, savingId, error, toggleSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used within SavedProvider");
  return ctx;
};
