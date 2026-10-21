'use client';

import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/admin/AuthForm/AuthForm';
import { AuthInput } from '@/components/admin/AuthInput/AuthInput';

// El server solo tiene endpoints GET, así que el login es visual: entra al Overview
const LoginPage = () => {
  const router = useRouter();

  return (
    <AuthForm
      submitText="Log In"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerHref="/admin/register"
      onSubmit={() => router.push('/admin/overview')}
    >
      <AuthInput icon="mail" type="email" placeholder="Email address" />
      <AuthInput icon="lock" type="password" placeholder="Password" />
      <span className="auth__forgot">Forgot password?</span>
    </AuthForm>
  );
};

export default LoginPage;
