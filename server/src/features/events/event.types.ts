export type EventStatus = "live" | "open" | "almost-full" | "closed";
export type EventSection = "happening" | "tonight" | "trending";

export interface EventTicket {
  id: string;
  name: string;
  price: number;
  currency: string;
}

export interface AfterEvent {
  id: string;
  title: string;
  venueName: string;
  address: string;
  imageUrl: string;
  categories: string[];
  status: EventStatus;
  displayDate: string;
  displayTime: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  capacity: number;
  occupied: number;
  rating: number;
  description: string;
  section: EventSection;
  mapLabel: string;
  ticket: EventTicket | null;
}

export interface CreateEventDTO {
  title: string;
  venueName: string;
  address: string;
  imageUrl: string;
  categories: string[];
  displayDate: string;
  displayTime: string;
  latitude: number;
  longitude: number;
  capacity: number;
  description: string;
  price: number;
}

export interface UpdateEventDTO {
  status?: EventStatus;
  capacity?: number;
  description?: string;
}

export interface EventStats {
  peopleNow: number;
  activeEvents: number;
  eventsToday: number;
  capacityPercent: number;
}
