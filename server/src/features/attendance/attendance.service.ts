import Boom from "@hapi/boom";
import { ACTIVITY_CHANNEL, broadcast, EVENTS_CHANNEL } from "../../config/realtime";
import { getExistingEvent } from "../events/event.service";
import {
  getActivityByIdRepository,
  getActivityRepository,
  getLastActionRepository,
  registerAttendanceRepository,
} from "./attendance.repository";
import { Activity, AttendanceAction, AttendanceDTO, AttendanceResult, AttendanceStatus } from "./attendance.types";

const isInside = (lastAction: AttendanceAction | null) => lastAction === "check-in";

const registerAttendance = async (attendance: AttendanceDTO, action: AttendanceAction): Promise<AttendanceResult> => {
  const activityId = await registerAttendanceRepository(attendance, action);

  if (!activityId) {
    throw Boom.conflict("This event is full or closed");
  }

  const [event, activity] = await Promise.all([
    getExistingEvent(attendance.eventId),
    getActivityByIdRepository(activityId),
  ]);

  if (!activity) {
    throw Boom.notFound("Activity not found");
  }

  broadcast(EVENTS_CHANNEL, "event-updated", event);
  broadcast(ACTIVITY_CHANNEL, "activity-created", activity);

  return { event, activity };
};

export const getAttendanceStatusService = async (attendance: AttendanceDTO): Promise<AttendanceStatus> => {
  await getExistingEvent(attendance.eventId);
  const lastAction = await getLastActionRepository(attendance);
  return { eventId: attendance.eventId, inside: isInside(lastAction) };
};

export const checkInService = async (attendance: AttendanceDTO): Promise<AttendanceResult> => {
  const event = await getExistingEvent(attendance.eventId);

  if (event.status === "closed") {
    throw Boom.conflict("This event is closed");
  }

  if (isInside(await getLastActionRepository(attendance))) {
    throw Boom.conflict("You are already inside this event");
  }

  return registerAttendance(attendance, "check-in");
};

export const checkOutService = async (attendance: AttendanceDTO): Promise<AttendanceResult> => {
  await getExistingEvent(attendance.eventId);

  if (!isInside(await getLastActionRepository(attendance))) {
    throw Boom.conflict("You are not inside this event");
  }

  return registerAttendance(attendance, "check-out");
};

export const getActivityService = async (eventId: string | null): Promise<Activity[]> => {
  if (eventId) {
    await getExistingEvent(eventId);
  }

  return getActivityRepository(eventId);
};
