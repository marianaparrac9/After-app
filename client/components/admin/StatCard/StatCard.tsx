import { Icon } from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';

interface StatCardProps {
  icon: IconName;
  label: string;
  value: string;
  caption: string;
}

export const StatCard = ({ icon, label, value, caption }: StatCardProps) => {
  return (
    <div className="stat-card">
      <p className="stat-card__label">
        <Icon name={icon} size={18} />
        {label}
      </p>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__caption">{caption}</p>
    </div>
  );
};
