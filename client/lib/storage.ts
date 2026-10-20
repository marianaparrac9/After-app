import { SessionUser } from "@/types/models";

const SESSION_KEY = "after-session";
const SAVED_KEY = "after-saved";

export const getStoredSession = (): SessionUser | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
};

export const setStoredSession = (user: SessionUser | null) => {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
};

export const getSavedIds = (userId: string): string[] => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(`${SAVED_KEY}-${userId}`);
  if (!raw) return userId === "cli-1" ? ["evt-1", "evt-4", "evt-5"] : [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
};

export const setSavedIds = (userId: string, ids: string[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${SAVED_KEY}-${userId}`, JSON.stringify(ids));
};
