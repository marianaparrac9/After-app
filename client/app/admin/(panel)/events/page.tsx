'use client';

import { useState } from 'react';
import { useEvents } from '@/contexts/admin/EventsProvider';
import { PageHeader } from '@/components/admin/PageHeader/PageHeader';
import { PillTabs } from '@/components/admin/PillTabs/PillTabs';
import { EventCard } from '@/components/admin/EventCard/EventCard';
import { CreateEventButton } from '@/components/admin/CreateEventButton/CreateEventButton';
import { EmptyState } from '@/components/admin/EmptyState/EmptyState';

const filters = [
  { value: 'all', label: 'All' },
  { value: 'live', label: 'Live' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'closed', label: 'Closed' },
];

const EventsPage = () => {
  const { events, loading, error } = useEvents();
  const [filter, setFilter] = useState('all');

  const visibleEvents =
    filter === 'all'
      ? events
      : events.filter((event) => event.status === filter);

  return (
    <>
      <PageHeader title="Edit Event" backHref="/admin/overview" />
      <PillTabs options={filters} selected={filter} onSelect={setFilter} />

      {loading && <EmptyState title="Loading events..." />}
      {error && <EmptyState title="Something went wrong" subtitle={error} />}
      {!loading && !error && visibleEvents.length === 0 && (
        <EmptyState title="No events here yet" />
      )}
      {visibleEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <CreateEventButton />
    </>
  );
};

export default EventsPage;
