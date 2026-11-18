"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAxios } from "./AxiosProvider";
import { useToast } from "./ToastProvider";
import { Profile, RegisterForm, Session } from "@/shared/models";
import { getErrorMessage } from "@/lib/errors";
import { getStoredSession, SESSION_EXPIRED_EVENT, setStoredSession } from "@/lib/storage";

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  ready: boolean;
  error: string;
  login: (email: string, password: string) => Promise<Profile | null>;
  register: (form: RegisterForm) => Promise<Profile | null>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const homeFor = (user: Profile) => (user.role === "admin" ? "/admin/overview" : "/home");

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  const saveSession = (session: Session) => {
    setStoredSession(session);
    setUser(session.user);
  };

  const logout = useCallback(() => {
    const wasAdmin = user?.role === "admin";
    setStoredSession(null);
    setUser(null);
    showToast("You logged out", "info");
    router.replace(wasAdmin ? "/admin/login" : "/login");
  }, [router, user, showToast]);

  useEffect(() => {
    const boot = async () => {
      const stored = getStoredSession();
      if (!stored) {
        setReady(true);
        return;
      }
      setUser(stored.user);
      try {
        const { data } = await axios.get<Profile>("/api/auth/me");
        const latest = getStoredSession();
        if (latest) saveSession({ ...latest, user: data });
      } catch {
        if (!getStoredSession()) setUser(null);
      } finally {
        setReady(true);
      }
    };
    void boot();
  }, [axios]);

  useEffect(() => {
    const onExpired = () => {
      setUser(null);
      showToast("Your session expired, log in again", "error");
      router.replace("/login");
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
  }, [router, showToast]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post<Session>("/api/auth/login", { email, password });
      saveSession(data);
      showToast(`Welcome back, ${data.user.fullName.split(" ")[0]}`, "success");
      router.push(homeFor(data.user));
      return data.user;
    } catch (err) {
      setError(getErrorMessage(err, "Login failed"));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (form: RegisterForm) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post<Session>("/api/auth/register", form);
      saveSession(data);
      showToast("Your account is ready", "success");
      router.push(homeFor(data.user));
      return data.user;
    } catch (err) {
      setError(getErrorMessage(err, "Could not create the account"));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = useCallback(() => setError(""), []);

  return (
    <AuthContext.Provider value={{ user, loading, ready, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
