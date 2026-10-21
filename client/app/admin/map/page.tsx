'use client';

import { useState } from 'react';
import { useEvents } from '@/contexts/admin/EventsProvider';
import { BackButton } from '@/components/admin/BackButton/BackButton';
import { Icon } from '@/components/admin/Icon/Icon';
import { MapPin } from '@/components/admin/MapPin/MapPin';
import { CurrentLocationCard } from '@/components/admin/CurrentLocationCard/CurrentLocationCard';
import { SelectedEventCard } from '@/components/admin/SelectedEventCard/SelectedEventCard';
import { EmptyState } from '@/components/admin/EmptyState/EmptyState';

const MapPage = () => {
  const { events, loading, error } = useEvents();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // En el mapa solo se muestran los eventos que no están cerrados
  const mapEvents = events.filter((event) => event.status !== 'closed');
  const selectedEvent = mapEvents.find((event) => event.id === selectedId);

  return (
    <div className="map">
      <div className="map__back">
        <BackButton href="/admin/events/new" />
      </div>

      <span className="map__me">
        <Icon name="pin" size={28} />
      </span>

      {(loading || error) && (
        <div className="map__status">
          {loading && <EmptyState title="Loading events..." />}
          {error && <EmptyState title="Something went wrong" subtitle={error} />}
        </div>
      )}

      {mapEvents.map((event) => (
        <MapPin
          key={event.id}
          event={event}
          selected={event.id === selectedId}
          onSelect={setSelectedId}
        />
      ))}

      <div className="map__cards">
        {selectedEvent ? (
          <SelectedEventCard event={selectedEvent} />
        ) : (
          <CurrentLocationCard backHref="/admin/events/new" />
        )}
      </div>
    </div>
  );
};

export default MapPage;
