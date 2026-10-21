'use client';

import { useEvents } from '@/contexts/admin/EventsProvider';
import { StatCard } from '../StatCard/StatCard';

// Las 4 tarjetas de números (Overview y Profile). Los datos vienen del EventsProvider
export const StatsGrid = () => {
  const { stats } = useEvents();

  return (
    <div className="stats">
      <StatCard
        icon="user"
        label="People Now"
        value={stats ? String(stats.peopleNow) : '-'}
        caption="Across active events"
      />
      <StatCard
        icon="live"
        label="Active Events"
        value={stats ? String(stats.activeEvents) : '-'}
        caption="currently live"
      />
      <StatCard
        icon="calendar"
        label="Events Today"
        value={stats ? String(stats.eventsToday) : '-'}
        caption="Including upcoming"
      />
      <StatCard
        icon="bars"
        label="Capacity"
        value={stats ? `${stats.capacityPercent}%` : '-'}
        caption="Across active events"
      />
    </div>
  );
};
