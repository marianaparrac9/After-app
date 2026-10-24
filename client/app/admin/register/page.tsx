'use client';

import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/admin/AuthForm/AuthForm';
import { AuthInput } from '@/components/admin/AuthInput/AuthInput';

const RegisterPage = () => {
  const router = useRouter();

  return (
    <AuthForm
      label="Administrator"
      submitText="Create Account"
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerHref="/admin/login"
      onSubmit={() => router.push('/admin/overview')}
    >
      <AuthInput icon="user" type="text" placeholder="Full name" />
      <AuthInput icon="mail" type="email" placeholder="Email address" />
      <AuthInput icon="lock" type="password" placeholder="Password" />
      <AuthInput icon="lock" type="password" placeholder="Confirm password" />
    </AuthForm>
  );
};

export default RegisterPage;
