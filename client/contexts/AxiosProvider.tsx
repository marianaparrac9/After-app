"use client";

import axios, { AxiosInstance } from "axios";
import { createContext, useContext, useMemo, ReactNode } from "react";

const AxiosContext = createContext<AxiosInstance | null>(null);

const onError = (error: unknown) => {
  const axiosError = error as { response?: { data?: { message?: string } } };
  const message = axiosError.response?.data?.message || "We could not reach the After API";
  return Promise.reject(new Error(message));
};

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const instance = useMemo(() => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
    const client = axios.create({ baseURL, timeout: 12000 });
    client.interceptors.response.use((response) => response, onError);
    return client;
  }, []);

  return <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => {
  const ctx = useContext(AxiosContext);
  if (!ctx) throw new Error("useAxios must be used within AxiosProvider");
  return ctx;
};
