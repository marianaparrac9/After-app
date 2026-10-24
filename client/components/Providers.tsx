"use client";

import { ReactNode } from "react";
import { AxiosProvider } from "@/contexts/AxiosProvider";
import { AuthProvider } from "@/contexts/AuthProvider";
import { DataProvider } from "@/contexts/DataProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AxiosProvider>
      <AuthProvider>
        <DataProvider>{children}</DataProvider>
      </AuthProvider>
    </AxiosProvider>
  );
};
