"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AfterLogo } from "@/components/AfterLogo";
import { IconLock, IconMail, IconPerson } from "@/components/Icons";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setMessage("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setMessage("Use laura.gomez@after.app / After123!");
  };

  return (
    <section className="screen auth">
      <AfterLogo />
      <form className="auth-card" onSubmit={onSubmit}>
        {message ? <p className="status-box">{message}</p> : null}
        <label className="field">
          <span className="icon-soft">
            <IconPerson />
          </span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            aria-label="Full name"
          />
        </label>
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
            autoComplete="new-password"
            aria-label="Password"
          />
        </label>
        <label className="field">
          <span className="icon-soft">
            <IconLock />
          </span>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            autoComplete="new-password"
            aria-label="Confirm password"
          />
        </label>
        <button className="btn" type="submit">
          Create Account
        </button>
      </form>
      <div className="divider">Or sign up with</div>
      <div className="social-row">
        <button className="social" type="button">
          Google
        </button>
        <button className="social" type="button">
          Apple
        </button>
      </div>
      <Link className="auth-link" href="/login">
        Already have an account? Log in
      </Link>
    </section>
  );
}
