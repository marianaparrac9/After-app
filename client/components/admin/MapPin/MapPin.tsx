import type { AfterEvent } from '@/lib/admin/types';
import { Icon } from '../Icon/Icon';
import { getPinPosition } from '@/lib/admin/map';

interface MapPinProps {
  event: AfterEvent;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const MapPin = ({ event, selected, onSelect }: MapPinProps) => {
  return (
    <button
      type="button"
      className={selected ? 'map-pin map-pin--selected' : 'map-pin'}
      style={getPinPosition(event)}
      onClick={() => onSelect(event.id)}
    >
      <Icon name="music" size={14} />
      {event.name}
    </button>
  );
};
