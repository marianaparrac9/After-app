export interface SeedEvent {
  id: string;
  title: string;
  venueName: string;
  address: string;
  imageUrl: string;
  categories: string[];
  status: string;
  displayDate: string;
  displayTime: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  capacity: number;
  occupied: number;
  rating: number;
  description: string;
  section: string;
  mapLabel: string;
}

export interface SeedProduct {
  id: string;
  eventId: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  imageUrl: string;
  place: string;
}
