'use client';

import { useEffect, useState } from 'react';
import { AuthForm } from '@/components/admin/AuthForm/AuthForm';
import { AuthInput } from '@/components/admin/AuthInput/AuthInput';
import { useAuth } from '@/contexts/AuthProvider';

const LoginPage = () => {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      setFormError('Write your email and password');
      return;
    }
    setFormError('');
    await login(email.trim(), password);
  };

  return (
    <AuthForm
      submitText="Log In"
      loadingText="Entering..."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerHref="/admin/register"
      loading={loading}
      error={formError || error}
      onSubmit={handleSubmit}
    >
      <AuthInput icon="mail" type="email" placeholder="Email address" value={email} onChange={setEmail} autoComplete="email" />
      <AuthInput
        icon="lock"
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
      />
      <span className="auth__forgot">Forgot password?</span>
    </AuthForm>
  );
};

export default LoginPage;
