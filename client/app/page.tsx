"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AfterLogo } from "@/components/AfterLogo/AfterLogo";
import { useAuth } from "@/contexts/AuthProvider";

export default function LoadingPage() {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => {
      if (!user) router.replace("/login");
      else router.replace(user.role === "admin" ? "/admin/overview" : "/home");
    }, 900);
    return () => window.clearTimeout(timer);
  }, [ready, user, router]);

  return (
    <section className="screen auth splash">
      <AfterLogo />
      <div className="spinner" aria-label="Loading After" />
    </section>
  );
}
