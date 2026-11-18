"use client";

import { useCallback, useEffect, useState } from "react";
import { useAxios } from "@/contexts/AxiosProvider";
import { useEvents } from "@/contexts/EventsProvider";
import { useToast } from "@/contexts/ToastProvider";
import { AttendanceResult, AttendanceStatus } from "@/shared/models";
import { getErrorMessage } from "@/lib/errors";

export const useAttendance = (eventId: string | undefined) => {
  const axios = useAxios();
  const { applyEvent } = useEvents();
  const { showToast } = useToast();
  const [inside, setInside] = useState(false);
  const [checking, setChecking] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    let active = true;
    setChecking(true);
    axios
      .get<AttendanceStatus>(`/api/attendance/${eventId}`)
      .then(({ data }) => {
        if (active) setInside(data.inside);
      })
      .catch(() => {
        if (active) setInside(false);
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [axios, eventId]);

  const toggleAttendance = useCallback(async () => {
    if (!eventId) return;
    setSending(true);
    try {
      const action = inside ? "check-out" : "check-in";
      const { data } = await axios.post<AttendanceResult>(`/api/attendance/${eventId}/${action}`);
      applyEvent(data.event);
      setInside(!inside);
      showToast(inside ? "You left the event" : "You are in, enjoy the night", "success");
    } catch (err) {
      showToast(getErrorMessage(err, "Could not update your attendance"), "error");
    } finally {
      setSending(false);
    }
  }, [axios, eventId, inside, applyEvent, showToast]);

  return { inside, checking, sending, toggleAttendance };
};
