import { AfterEvent } from "../events/event.types";

export interface SavedEvent {
  savedAt: string;
  event: AfterEvent;
}

export interface SaveEventDTO {
  userId: string;
  eventId: string;
}
