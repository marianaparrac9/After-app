import type { Activity } from '@/lib/admin/types';

interface ActivityListProps {
  activities: Activity[];
  bordered?: boolean;
}

export const ActivityList = ({ activities, bordered = false }: ActivityListProps) => {
  return (
    <ul className={bordered ? 'activity activity--bordered' : 'activity'}>
      {activities.map((activity) => (
        <li key={activity.id}>
          <span className="activity__time">{activity.time}</span> —{' '}
          {activity.message}
        </li>
      ))}
    </ul>
  );
};
