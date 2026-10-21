"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";

export const Guard = ({ children }: { children: ReactNode }) => {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user, router]);

  if (!ready) {
    return (
      <section className="screen auth">
        <div className="spinner" aria-label="Loading" />
      </section>
    );
  }

  if (!user) return null;
  return <>{children}</>;
};
