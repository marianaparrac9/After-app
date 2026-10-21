import type { EventStatus } from '@/lib/admin/types';

interface StatusBadgeProps {
  status: EventStatus;
  label?: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <span className={`badge badge--${status}`}>{label ?? status}</span>
  );
};
