import Boom from "@hapi/boom";
import { broadcast, EVENTS_CHANNEL } from "../../config/realtime";
import {
  createEventRepository,
  deleteEventRepository,
  getEventByIdRepository,
  getEventsRepository,
  getEventStatsRepository,
  updateEventRepository,
} from "./event.repository";
import { AfterEvent, CreateEventDTO, EventStats, UpdateEventDTO } from "./event.types";

export const getExistingEvent = async (id: string): Promise<AfterEvent> => {
  const event = await getEventByIdRepository(id);

  if (!event) {
    throw Boom.notFound("Event not found");
  }

  return event;
};

export const getEventsService = async (): Promise<AfterEvent[]> => getEventsRepository();

export const getEventByIdService = async (id: string): Promise<AfterEvent> => getExistingEvent(id);

export const getEventStatsService = async (): Promise<EventStats> => getEventStatsRepository();

export const createEventService = async (event: CreateEventDTO): Promise<AfterEvent> => {
  const id = await createEventRepository(event);
  const created = await getExistingEvent(id);
  broadcast(EVENTS_CHANNEL, "event-created", created);
  return created;
};

export const updateEventService = async (id: string, changes: UpdateEventDTO): Promise<AfterEvent> => {
  const current = await getExistingEvent(id);

  if (changes.capacity !== undefined && changes.capacity < current.occupied) {
    throw Boom.conflict("Capacity can not be lower than the people inside");
  }

  await updateEventRepository(id, changes);
  const updated = await getExistingEvent(id);
  broadcast(EVENTS_CHANNEL, "event-updated", updated);
  return updated;
};

export const deleteEventService = async (id: string): Promise<void> => {
  const deleted = await deleteEventRepository(id);

  if (!deleted) {
    throw Boom.notFound("Event not found");
  }

  broadcast(EVENTS_CHANNEL, "event-deleted", { id });
};
