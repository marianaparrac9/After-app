import { getCapacityPercent } from '@/lib/admin/capacity';

interface CapacityBarProps {
  attendees: number;
  capacity: number;
}

export const CapacityBar = ({ attendees, capacity }: CapacityBarProps) => {
  const percent = getCapacityPercent(attendees, capacity);

  return (
    <div className="capacity">
      <div className="capacity__bar">
        <div className="capacity__fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="capacity__row">
        <span>Capacity</span>
        <strong>
          {attendees} / {capacity} ({percent}%)
        </strong>
      </p>
    </div>
  );
};
