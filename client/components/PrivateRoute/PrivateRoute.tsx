"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthProvider";
import { Role } from "@/shared/models";

interface PrivateRouteProps {
  children: ReactNode;
  role?: Role;
  redirectTo?: string;
}

export const PrivateRoute = ({ children, role, redirectTo = "/login" }: PrivateRouteProps) => {
  const { user, ready } = useAuth();
  const router = useRouter();
  const allowed = !!user && (!role || user.role === role);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace(redirectTo);
      return;
    }
    if (role && user.role !== role) {
      router.replace(user.role === "admin" ? "/admin/overview" : "/home");
    }
  }, [ready, user, role, redirectTo, router]);

  if (!ready || !allowed) {
    return (
      <section className="screen auth">
        <div className="spinner" aria-label="Loading" />
      </section>
    );
  }

  return <>{children}</>;
};
