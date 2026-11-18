import Boom from "@hapi/boom";
import { CreateEventDTO, EventStatus, UpdateEventDTO } from "./event.types";

const STATUSES: EventStatus[] = ["live", "open", "almost-full", "closed"];
const DEFAULT_IMAGE = "/images/events/techno-night.jpg";

const requiredText = (value: unknown, field: string): string => {
  if (typeof value !== "string" || !value.trim()) {
    throw Boom.badRequest(`${field} is required`);
  }
  return value.trim();
};

const numberInRange = (value: unknown, field: string, min: number, max: number): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    throw Boom.badRequest(`${field} must be between ${min} and ${max}`);
  }
  return parsed;
};

export const validateCreateEvent = (body: Record<string, unknown>): CreateEventDTO => {
  const categories = Array.isArray(body.categories)
    ? body.categories.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];

  if (categories.length === 0) {
    throw Boom.badRequest("Pick at least one category");
  }

  const imageUrl = typeof body.imageUrl === "string" && body.imageUrl.trim() ? body.imageUrl.trim() : DEFAULT_IMAGE;

  return {
    title: requiredText(body.title, "Title"),
    venueName: requiredText(body.venueName, "Venue"),
    address: requiredText(body.address, "Address"),
    imageUrl,
    categories: categories.map((item) => item.trim().toLowerCase()),
    displayDate: requiredText(body.displayDate, "Date"),
    displayTime: requiredText(body.displayTime, "Time"),
    latitude: numberInRange(body.latitude, "Latitude", -90, 90),
    longitude: numberInRange(body.longitude, "Longitude", -180, 180),
    capacity: Math.round(numberInRange(body.capacity, "Capacity", 1, 100000)),
    description: typeof body.description === "string" ? body.description.trim() : "",
    price: Math.round(numberInRange(body.price ?? 0, "Price", 0, 10000000)),
  };
};

export const validateUpdateEvent = (body: Record<string, unknown>): UpdateEventDTO => {
  const changes: UpdateEventDTO = {};

  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status as EventStatus)) {
      throw Boom.badRequest("Status is not valid");
    }
    changes.status = body.status as EventStatus;
  }

  if (body.capacity !== undefined) {
    changes.capacity = Math.round(numberInRange(body.capacity, "Capacity", 1, 100000));
  }

  if (body.description !== undefined) {
    changes.description = String(body.description).trim();
  }

  if (Object.keys(changes).length === 0) {
    throw Boom.badRequest("Nothing to update");
  }

  return changes;
};
