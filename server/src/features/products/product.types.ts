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
