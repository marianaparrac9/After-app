import Image from 'next/image';
import Link from 'next/link';
import type { AfterEvent } from '@/lib/admin/types';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { CapacityBar } from '../CapacityBar/CapacityBar';

interface EventCardProps {
  event: AfterEvent;
  liveControl?: boolean;
}

// Tarjeta de evento. Con liveControl=true es un enlace a la pantalla Live Control
export const EventCard = ({ event, liveControl = false }: EventCardProps) => {
  const card = (
    <>
      <Image
        src={event.image}
        alt={event.name}
        width={600}
        height={300}
        className="event-card__image"
      />
      <div className="event-card__body">
        <div className="event-card__top">
          <h3 className="event-card__name">{event.name}</h3>
          <StatusBadge
            status={event.status}
            label={liveControl ? 'live control' : undefined}
          />
        </div>
        <p className="event-card__meta">
          {event.date} · {event.startTime} · {event.location}
        </p>
        <CapacityBar attendees={event.attendees} capacity={event.capacity} />
      </div>
    </>
  );

  if (liveControl) {
    return (
      <Link href={`/admin/live/${event.id}`} className="event-card">
        {card}
      </Link>
    );
  }

  return <div className="event-card">{card}</div>;
};
