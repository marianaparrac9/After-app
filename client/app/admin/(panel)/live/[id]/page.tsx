'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useEvents } from '@/contexts/admin/EventsProvider';
import { useActivity } from '@/contexts/admin/ActivityProvider';
import { getCapacityPercent } from '@/lib/admin/capacity';
import { PageHeader } from '@/components/admin/PageHeader/PageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge/StatusBadge';
import { ActivityList } from '@/components/admin/ActivityList/ActivityList';
import { EmptyState } from '@/components/admin/EmptyState/EmptyState';

const LiveControlPage = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedEvent, eventLoading, eventError, loadEvent } = useEvents();
  const { eventActivities, loadEventActivity } = useActivity();

  useEffect(() => {
    loadEvent(id);
    loadEventActivity(id);
  }, [id, loadEvent, loadEventActivity]);

  const event = selectedEvent?.id === id ? selectedEvent : null;
  const percent = event ? getCapacityPercent(event.attendees, event.capacity) : 0;

  let tag = '';
  if (percent >= 100) tag = 'FULL';
  else if (percent >= 80) tag = 'ALMOST FULL';

  return (
    <>
      <PageHeader title="Live Control" backHref="/admin/live" />

      {eventLoading && !event && <EmptyState title="Loading event..." />}
      {eventError && (
        <EmptyState title="Something went wrong" subtitle={eventError} />
      )}

      {event && (
        <>
          <div className="live-name-row">
            {event.name}
            <StatusBadge status={event.status} />
          </div>
          <p className="live-subtitle">
            {event.location} · {event.startTime} – {event.endTime}
          </p>

          <div className="people-card">
            {tag && <span className="people-card__tag">{tag}</span>}
            <p className="people-card__label">PEOPLE NOW</p>
            <p className="people-card__number">
              {event.attendees} <small>/ {event.capacity}</small>
            </p>
            <span className="people-card__percent">{percent}% CAPACITY</span>
            <div className="capacity__bar">
              <div className="capacity__fill" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <h2 className="live-activity-title">Live Activity</h2>
          <ActivityList activities={eventActivities} bordered />
        </>
      )}
    </>
  );
};

export default LiveControlPage;
