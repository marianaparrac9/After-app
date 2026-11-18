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
  const { events, loading, error, deletingId, deleteEvent } = useEvents();
  const [filter, setFilter] = useState('all');

  const visibleEvents =
    filter === 'all'
      ? events
      : events.filter((event) => event.status === filter);

  const handleDelete = (id: string) => {
    const event = events.find((item) => item.id === id);
    if (event && window.confirm(`Delete ${event.name}? This can not be undone.`)) {
      void deleteEvent(id);
    }
  };

  return (
    <>
      <PageHeader title="Edit Event" backHref="/admin/overview" />
      <PillTabs options={filters} selected={filter} onSelect={setFilter} />

      {loading && events.length === 0 && <EmptyState title="Loading events..." />}
      {error && <EmptyState title="Something went wrong" subtitle={error} />}
      {!loading && !error && visibleEvents.length === 0 && (
        <EmptyState title="No events here yet" />
      )}
      {visibleEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          deleting={deletingId === event.id}
          onDelete={handleDelete}
        />
      ))}

      <CreateEventButton />
    </>
  );
};

export default EventsPage;
