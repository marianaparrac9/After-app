export type EventStatus = "live" | "open" | "almost-full" | "closed";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  imageUrl: string;
  place: string;
}

export interface ClientProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string;
}

export interface Payment {
  id: string;
  clientId: string;
  productId: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed";
  createdAt: string;
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
}

export interface EventFilters {
  search: string;
  category: string;
  status: string;
  time: string;
  maxDistance: number;
}

export interface SessionUser extends ClientProfile {}
