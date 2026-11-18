"use client";

import { AxiosInstance } from "axios";
import { createContext, useContext, ReactNode } from "react";
import { api } from "@/lib/axios";

const AxiosContext = createContext<AxiosInstance | null>(null);

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  return <AxiosContext.Provider value={api}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => {
  const ctx = useContext(AxiosContext);
  if (!ctx) throw new Error("useAxios must be used within AxiosProvider");
  return ctx;
};
