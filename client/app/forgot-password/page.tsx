"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AfterLogo } from "@/components/AfterLogo";
import { IconMail } from "@/components/Icons";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setInfo("Enter an email address");
      return;
    }
    setInfo("This mock delivery cannot send emails.");
  };

  return (
    <section className="screen auth">
      <AfterLogo />
      <h1 className="forgot-title">Forgot your password?</h1>
      <form className="auth-card" onSubmit={onSubmit}>
        {info ? <p className="form-ok">{info}</p> : null}
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
        <button className="btn" type="submit">
          Send Link
        </button>
      </form>
      <Link className="auth-link" href="/login">
        Already have an account? Log in
      </Link>
    </section>
  );
}
