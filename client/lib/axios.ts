import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Session } from "@/shared/models";
import { API_URL } from "./config";
import { getStoredSession, notifySessionExpired, setStoredSession } from "./storage";

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const PUBLIC_AUTH_PATHS = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"];

export const api = axios.create({ baseURL: API_URL, timeout: 15000 });

let refreshing: Promise<Session | null> | null = null;

const refreshSession = async (): Promise<Session | null> => {
  const current = getStoredSession();
  if (!current) return null;

  try {
    const { data } = await axios.post<Session>(`${API_URL}/api/auth/refresh`, {
      refreshToken: current.refreshToken,
    });
    setStoredSession(data);
    return data;
  } catch {
    return null;
  }
};

api.interceptors.request.use((config) => {
  const session = getStoredSession();

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    const isPublic = PUBLIC_AUTH_PATHS.some((path) => original?.url?.includes(path));

    if (error.response?.status !== 401 || !original || original._retry || isPublic) {
      return Promise.reject(error);
    }

    original._retry = true;
    refreshing = refreshing ?? refreshSession().finally(() => {
      refreshing = null;
    });

    const session = await refreshing;

    if (!session) {
      setStoredSession(null);
      notifySessionExpired();
      return Promise.reject(error);
    }

    original.headers.Authorization = `Bearer ${session.token}`;
    return api(original);
  }
);
