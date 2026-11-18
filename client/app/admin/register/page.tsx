'use client';

import { useEffect, useState } from 'react';
import { AuthForm } from '@/components/admin/AuthForm/AuthForm';
import { AuthInput } from '@/components/admin/AuthInput/AuthInput';
import { useAuth } from '@/contexts/AuthProvider';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage = () => {
  const { register, loading, error, clearError } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setFormError('Write a valid email');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must have at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    setFormError('');
    await register({ fullName: fullName.trim(), email: email.trim(), password, role: 'admin' });
  };

  return (
    <AuthForm
      label="Administrator"
      submitText="Create Account"
      loadingText="Creating..."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerHref="/admin/login"
      loading={loading}
      error={formError || error}
      onSubmit={handleSubmit}
    >
      <AuthInput icon="user" type="text" placeholder="Full name" value={fullName} onChange={setFullName} autoComplete="name" />
      <AuthInput icon="mail" type="email" placeholder="Email address" value={email} onChange={setEmail} autoComplete="email" />
      <AuthInput
        icon="lock"
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
      />
      <AuthInput
        icon="lock"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        autoComplete="new-password"
      />
    </AuthForm>
  );
};

export default RegisterPage;
