'use client';

import Image from 'next/image';
import { useProfile } from '@/contexts/admin/ProfileProvider';
import { useAuth } from '@/contexts/AuthProvider';
import { BackButton } from '@/components/admin/BackButton/BackButton';
import { StatsGrid } from '@/components/admin/StatsGrid/StatsGrid';
import { MenuItem } from '@/components/admin/MenuItem/MenuItem';
import { Icon } from '@/components/admin/Icon/Icon';
import { CreateEventButton } from '@/components/admin/CreateEventButton/CreateEventButton';
import { EmptyState } from '@/components/admin/EmptyState/EmptyState';

const ProfilePage = () => {
  const { profile, loading, error } = useProfile();
  const { logout } = useAuth();

  return (
    <div className="page page--no-nav">
      <header className="profile-header">
        <div className="profile-header__top">
          <BackButton href="/admin/overview" />
          <h1 className="profile-header__title">Profile</h1>
        </div>

        {loading && <EmptyState title="Loading profile..." />}
        {error && <EmptyState title="Something went wrong" subtitle={error} />}
        {profile && (
          <>
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={108}
              height={108}
              className="profile-header__photo"
            />
            <h2 className="profile-header__name">{profile.name}</h2>
            <p className="profile-header__user">{profile.username}</p>
          </>
        )}
      </header>

      <StatsGrid />

      <div className="menu">
        <MenuItem icon="heart" title="My Events" subtitle="See your upcoming events" href="/admin/events" />
        <MenuItem icon="bell" title="Notifications" subtitle="Event updates and alerts" />
        <MenuItem icon="settings" title="Settings" subtitle="Location, privacy, preferences" />
        <MenuItem icon="help" title="Help & Support" subtitle="FAQ, contact us" />
      </div>

      <button type="button" className="logout" onClick={logout}>
        <span className="menu-item__icon">
          <Icon name="logout" size={20} />
        </span>
        Log out
      </button>

      <CreateEventButton />
    </div>
  );
};

export default ProfilePage;
