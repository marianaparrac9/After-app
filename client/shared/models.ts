export type EventStatus = "live" | "open" | "almost-full" | "closed";
export type Role = "user" | "admin";

export interface Profile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role: Role;
}

export interface Session {
  user: Profile;
  token: string;
  refreshToken: string;
  expiresAt: number;
}

export interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface EventTicket {
  id: string;
  name: string;
  price: number;
  currency: string;
}

export interface EventItem {
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
  section: "happening" | "tonight" | "trending";
  mapLabel: string;
  ticket: EventTicket | null;
}

export interface EventFilters {
  search: string;
  category: string;
  status: string;
  time: string;
  maxDistance: number;
}

export interface SavedEvent {
  savedAt: string;
  event: EventItem;
}

export interface Product {
  id: string;
  eventId: string | null;
  name: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  imageUrl: string;
  place: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
  createdAt: string;
  product: {
    id: string;
    name: string;
    eventId: string | null;
    imageUrl: string;
  };
}

export interface AttendanceStatus {
  eventId: string;
  inside: boolean;
}

export interface ActivityItem {
  id: string;
  eventId: string;
  eventTitle: string;
  action: "check-in" | "check-out";
  createdAt: string;
  user: {
    id: string;
    fullName: string;
  };
}

export interface AttendanceResult {
  event: EventItem;
  activity: ActivityItem;
}

export interface CreateEventForm {
  title: string;
  venueName: string;
  address: string;
  categories: string[];
  displayDate: string;
  displayTime: string;
  latitude: number;
  longitude: number;
  capacity: number;
  description: string;
  price: number;
  imageUrl: string;
}
