'use client';

import Link from 'next/link';
import { useProfile } from '@/contexts/admin/ProfileProvider';

export const Avatar = () => {
  const { profile } = useProfile();

  return (
    <Link href="/admin/profile" className="avatar">
      {profile?.initials}
    </Link>
  );
};
