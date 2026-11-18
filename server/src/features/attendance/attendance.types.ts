import { AfterEvent } from "../events/event.types";

export type AttendanceAction = "check-in" | "check-out";

export interface Activity {
  id: string;
  eventId: string;
  eventTitle: string;
  action: AttendanceAction;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
  };
}

export interface AttendanceDTO {
  userId: string;
  eventId: string;
}

export interface AttendanceStatus {
  eventId: string;
  inside: boolean;
}

export interface AttendanceResult {
  event: AfterEvent;
  activity: Activity;
}
