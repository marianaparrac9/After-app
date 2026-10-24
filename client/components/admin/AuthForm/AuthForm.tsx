'use client';

import Link from 'next/link';
import type { FormEvent, ReactNode } from 'react';
import { Logo } from '../Logo/Logo';

interface AuthFormProps {
  label?: string;
  submitText: string;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
  onSubmit: () => void;
  children: ReactNode;
}

export const AuthForm = ({
  label,
  submitText,
  footerText,
  footerLinkText,
  footerHref,
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

      <form className="auth__card" onSubmit={handleSubmit}>
        {children}
        <button type="submit" className="btn">
          {submitText}
        </button>
      </form>

      <p className="auth__footer">
        {footerText} <Link href={footerHref}>{footerLinkText}</Link>
      </p>
    </div>
  );
};
