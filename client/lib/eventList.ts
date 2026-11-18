import { EventFilters, EventItem } from "@/shared/models";

export const upsertEvent = (events: EventItem[], event: EventItem) =>
  events.some((item) => item.id === event.id)
    ? events.map((item) => (item.id === event.id ? event : item))
    : [...events, event];

export const removeEvent = (events: EventItem[], id: string) => events.filter((item) => item.id !== id);

export const matchesFilters = (item: EventItem, filters: EventFilters) => {
  const q = filters.search.trim().toLowerCase();
  const searchOk =
    !q ||
    item.title.toLowerCase().includes(q) ||
    item.venueName.toLowerCase().includes(q) ||
    item.categories.some((category) => category.toLowerCase().includes(q));
  const categoryOk = filters.category === "all" || item.categories.includes(filters.category);
  const statusOk = filters.status === "all" || item.status === filters.status;
  const distanceOk = item.distanceKm <= filters.maxDistance || filters.maxDistance >= 10;
  return searchOk && categoryOk && statusOk && distanceOk;
};
