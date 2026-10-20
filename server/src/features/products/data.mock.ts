import { Product } from "./product.types";

export const productsMock: Product[] = [
  {
    id: "prod-1",
    name: "Rooftop Sessions",
    category: "ticket",
    price: 45000,
    currency: "COP",
    description: "Sunset rooftop party in Cali.",
    imageUrl: "/images/events/rooftop-sessions.jpg",
    place: "Skyline Rooftop",
  },
  {
    id: "prod-2",
    name: "Jazz & Wine",
    category: "ticket",
    price: 38000,
    currency: "COP",
    description: "Live jazz and wine night.",
    imageUrl: "/images/events/jazz-wine.jpg",
    place: "La Cebra",
  },
  {
    id: "prod-3",
    name: "Indie Vibes",
    category: "ticket",
    price: 32000,
    currency: "COP",
    description: "Independent bands and lights.",
    imageUrl: "/images/events/indie-vibes.jpg",
    place: "Metropolitan",
  },
  {
    id: "prod-4",
    name: "Retro Night",
    category: "ticket",
    price: 50000,
    currency: "COP",
    description: "Disco night with resident DJs.",
    imageUrl: "/retro.png",
    place: "Disco Hall",
  },
];
