import Boom from "@hapi/boom";
import { getExistingEvent } from "../events/event.service";
import { deleteSavedEventRepository, getSavedEventsRepository, saveEventRepository } from "./saved.repository";
import { SavedEvent, SaveEventDTO } from "./saved.types";

export const getSavedEventsService = async (userId: string): Promise<SavedEvent[]> =>
  getSavedEventsRepository(userId);

export const saveEventService = async (saved: SaveEventDTO): Promise<SavedEvent[]> => {
  await getExistingEvent(saved.eventId);
  await saveEventRepository(saved);
  return getSavedEventsRepository(saved.userId);
};

export const deleteSavedEventService = async (saved: SaveEventDTO): Promise<void> => {
  const deleted = await deleteSavedEventRepository(saved);

  if (!deleted) {
    throw Boom.notFound("This event is not in your saved list");
  }
};
