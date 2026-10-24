"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAxios } from "./AxiosProvider";
import { ClientProfile, SessionUser } from "@/types/models";
import { getStoredSession, setStoredSession } from "@/lib/storage";

const DEMO_PASSWORDS: Record<string, string> = {
  "laura.gomez@after.app": "After123!",
  "andres.ruiz@after.app": "After123!",
};

interface AuthContextType {
  user: SessionUser | null;
  clients: ClientProfile[];
  loading: boolean;
  ready: boolean;
  error: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const axios = useAxios();
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const boot = async () => {
      try {
        const { data } = await axios.get<ClientProfile[]>("/api/clients");
        setClients(data);
        const stored = getStoredSession();
        if (stored) {
          const match = data.find((item) => item.id === stored.id);
          setUser(match || stored);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load clients");
        const stored = getStoredSession();
        if (stored) setUser(stored);
      } finally {
        setReady(true);
      }
    };
    void boot();
  }, [axios]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get<ClientProfile[]>("/api/clients");
      setClients(data);
      const found = data.find((item) => item.email.toLowerCase() === email.toLowerCase());
      const expected = DEMO_PASSWORDS[email.toLowerCase()];
      if (!found || !expected || expected !== password) {
        setError("Email or password is not correct");
        return false;
      }
      setStoredSession(found);
      setUser(found);
      router.push("/home");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setStoredSession(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, clients, loading, ready, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
