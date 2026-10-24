"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AfterLogo } from "@/components/AfterLogo";
import { IconLock, IconMail } from "@/components/Icons";
import { useAuth } from "@/contexts/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <section className="screen auth">
      <AfterLogo />
      <form className="auth-card" onSubmit={onSubmit}>
        {error ? <p className="form-error">{error}</p> : null}
        <label className="field">
          <span className="icon-soft">
            <IconMail />
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            autoComplete="email"
            aria-label="Email address"
          />
        </label>
        <label className="field">
          <span className="icon-soft">
            <IconLock />
          </span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            aria-label="Password"
          />
        </label>
        <Link className="forgot" href="/forgot-password">
          Forgot password?
        </Link>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Entering..." : "Log In"}
        </button>
      </form>
      <div className="divider">Or log in with</div>
      <div className="social-row">
        <button className="social" type="button">
          Google
        </button>
        <button className="social" type="button">
          Apple
        </button>
      </div>
      <Link className="auth-link" href="/register">
        Don't have an account? Sign up
      </Link>
      <button className="admin-link" type="button" onClick={() => router.push("/admin/login")}>
        Sign in as an Administrator
      </button>
    </section>
  );
}
