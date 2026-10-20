"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AfterLogo } from "@/components/AfterLogo";
import { useAuth } from "@/contexts/AuthProvider";

export default function LoadingPage() {
  const { user, ready, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => {
      router.replace(user ? "/home" : "/login");
    }, 900);
    return () => window.clearTimeout(timer);
  }, [ready, user, router]);

  return (
    <section className="screen auth splash">
      <AfterLogo />
      <div className="spinner" aria-label="Loading After" />
      {error ? <p className="form-error">{error}</p> : null}
    </section>
  );
}
