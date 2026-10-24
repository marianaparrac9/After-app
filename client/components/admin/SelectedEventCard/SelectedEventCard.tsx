import Image from 'next/image';
import type { AfterEvent } from '@/lib/admin/types';
import { Icon } from '../Icon/Icon';

export const SelectedEventCard = ({ event }: { event: AfterEvent }) => {
  return (
    <>
      <div className="map-card map-card--event">
        <Image
          src={event.image}
          alt={event.name}
          width={120}
          height={120}
          className="map-card__thumb"
        />
        <div>
          <p className="map-card__big">{event.location}</p>
          <p className="map-card__small">{event.distance}</p>
          <span className="map-card__button map-card__button--small">
            Start walking
          </span>
        </div>
      </div>

      <div className="map-card">
        <p className="map-card__title">Location</p>
        <p className="map-card__address">
          <Icon name="pin" size={18} />
          {event.address}
        </p>
      </div>
    </>
  );
};
