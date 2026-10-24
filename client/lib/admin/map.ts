import type { AfterEvent } from '@/lib/admin/types';

const BOUNDS = { west: -76.55, east: -76.51, north: 3.47, south: 3.44 };

export const getPinPosition = (event: AfterEvent) => {
  const left = ((event.longitude - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100;
  const top = ((BOUNDS.north - event.latitude) / (BOUNDS.north - BOUNDS.south)) * 100;
  return { left: `${left}%`, top: `${top}%` };
};
