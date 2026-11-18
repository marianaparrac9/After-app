"use client";

import { ReactNode } from "react";
import { AxiosProvider } from "@/contexts/AxiosProvider";
import { ToastProvider } from "@/contexts/ToastProvider";
import { AuthProvider } from "@/contexts/AuthProvider";
import { EventsProvider } from "@/contexts/EventsProvider";
import { SavedProvider } from "@/contexts/SavedProvider";
import { TicketsProvider } from "@/contexts/TicketsProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AxiosProvider>
      <ToastProvider>
        <AuthProvider>
          <EventsProvider>
            <SavedProvider>
              <TicketsProvider>{children}</TicketsProvider>
            </SavedProvider>
          </EventsProvider>
        </AuthProvider>
      </ToastProvider>
    </AxiosProvider>
  );
};
