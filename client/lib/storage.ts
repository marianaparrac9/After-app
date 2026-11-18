import { Session } from "@/shared/models";

const SESSION_KEY = "after-session";
export const SESSION_EXPIRED_EVENT = "after-session-expired";

export const getStoredSession = (): Session | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Session;
    return parsed.token && parsed.refreshToken ? parsed : null;
  } catch {
    return null;
  }
};

export const setStoredSession = (session: Session | null) => {
  if (typeof window === "undefined") return;
  if (session) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
};

export const notifySessionExpired = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
};
