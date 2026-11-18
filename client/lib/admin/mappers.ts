import type { ActivityItem, EventItem } from '@/shared/models';
import type { Activity, AfterEvent, EventStatus } from './types';

const toStatus = (status: EventItem['status']): EventStatus => {
  if (status === 'live') return 'live';
  if (status === 'closed') return 'closed';
  return 'upcoming';
};

export const toAdminEvent = (item: EventItem): AfterEvent => {
  const [startTime, endTime] = item.displayTime.split(' - ');
  return {
    id: item.id,
    name: item.title,
    description: item.description,
    date: item.displayDate,
    startTime: startTime || item.displayTime,
    endTime: endTime || '',
    location: item.venueName,
    address: item.address,
    distance: `${item.distanceKm} km`,
    latitude: item.latitude,
    longitude: item.longitude,
    image: item.imageUrl,
    status: toStatus(item.status),
    rawStatus: item.status,
    attendees: item.occupied,
    capacity: item.capacity,
  };
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase();

export const toActivity = (item: ActivityItem): Activity => ({
  id: item.id,
  eventId: item.eventId,
  time: formatTime(item.createdAt),
  message:
    item.action === 'check-in'
      ? `${item.user.fullName} arrived at ${item.eventTitle}`
      : `${item.user.fullName} left ${item.eventTitle}`,
});
