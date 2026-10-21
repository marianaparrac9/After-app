'use client';

import Link from 'next/link';
import { useProfile } from '@/contexts/admin/ProfileProvider';

// Círculo con las iniciales del admin (LS). Lleva a la pantalla Profile
export const Avatar = () => {
  const { profile } = useProfile();

  return (
    <Link href="/admin/profile" className="avatar">
      {profile?.initials}
    </Link>
  );
};
