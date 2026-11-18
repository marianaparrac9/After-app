'use client';

import Link from 'next/link';
import type { FormEvent, ReactNode } from 'react';
import { Logo } from '../Logo/Logo';

interface AuthFormProps {
  label?: string;
  submitText: string;
  loadingText: string;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
  loading: boolean;
  error?: string;
  onSubmit: () => void;
  children: ReactNode;
}

export const AuthForm = ({
  label,
  submitText,
  loadingText,
  footerText,
  footerLinkText,
  footerHref,
  loading,
  error,
  onSubmit,
  children,
}: AuthFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="auth">
      <Logo />
      {label && <p className="auth__label">{label}</p>}

      <form className="auth__card" onSubmit={handleSubmit} noValidate>
        {error && (
          <p className="auth__error" role="alert">
            {error}
          </p>
        )}
        {children}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? loadingText : submitText}
        </button>
      </form>

      <p className="auth__footer">
        {footerText} <Link href={footerHref}>{footerLinkText}</Link>
      </p>
    </div>
  );
};
