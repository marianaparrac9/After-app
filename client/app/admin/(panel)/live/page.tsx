'use client';

import { useState } from 'react';
import { useEvents } from '@/contexts/admin/EventsProvider';
import { PageHeader } from '@/components/admin/PageHeader/PageHeader';
import { PillTabs } from '@/components/admin/PillTabs/PillTabs';
import { EventCard } from '@/components/admin/EventCard/EventCard';
import { CreateEventButton } from '@/components/admin/CreateEventButton/CreateEventButton';
import { EmptyState } from '@/components/admin/EmptyState/EmptyState';

const tabs = [
  { value: 'upcoming', label: 'Open' },
  { value: 'live', label: 'Set Live' },
  { value: 'closed', label: 'Closed' },
];

const LivePage = () => {
  const { events, loading, error } = useEvents();
  const [selected, setSelected] = useState('live');

  const visibleEvents = events.filter((event) => event.status === selected);

  return (
    <>
      <PageHeader title="Live" backHref="/admin/overview" />
      <PillTabs options={tabs} selected={selected} onSelect={setSelected} />

      {loading && <EmptyState title="Loading events..." />}
      {error && <EmptyState title="Something went wrong" subtitle={error} />}
      {!loading && !error && visibleEvents.length === 0 && (
        <EmptyState title="No events here yet" />
      )}
      {visibleEvents.map((event) => (
        <EventCard key={event.id} event={event} liveControl />
      ))}

      <CreateEventButton />
    </>
  );
};

export default LivePage;
