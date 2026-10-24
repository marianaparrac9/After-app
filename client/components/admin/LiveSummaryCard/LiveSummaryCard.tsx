import Image from 'next/image';
import type { AfterEvent } from '@/lib/admin/types';
import { CapacityBar } from '../CapacityBar/CapacityBar';

export const LiveSummaryCard = ({ event }: { event: AfterEvent }) => {
  return (
    <div className="live-card">
      <div className="live-card__image-wrap">
        <Image
          src={event.image}
          alt={event.name}
          width={600}
          height={400}
          className="live-card__image"
        />
        <span className="live-card__badge">
          LIVE <i className="live-card__dot" />
        </span>
      </div>
      <div className="live-card__body">
        <h3 className="live-card__name">{event.name}</h3>
        <p className="live-card__location">{event.location}</p>
        <CapacityBar attendees={event.attendees} capacity={event.capacity} />
        <p className="live-card__time">
          Starts {event.startTime} · Ends {event.endTime}
        </p>
      </div>
    </div>
  );
};
