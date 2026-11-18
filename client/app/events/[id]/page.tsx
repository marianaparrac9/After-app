"use client";

import { useParams, useRouter } from "next/navigation";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Loader } from "@/components/Loader/Loader";
import {
  IconBack,
  IconCalendar,
  IconCapacity,
  IconClock,
  IconHeart,
  IconPin,
  IconShare,
  IconStar,
} from "@/components/Icons/Icons";
import { useEvents } from "@/contexts/EventsProvider";
import { useSaved } from "@/contexts/SavedProvider";
import { useTickets } from "@/contexts/TicketsProvider";
import { useAttendance } from "@/hooks/useAttendance";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getEventById, loading } = useEvents();
  const { toggleSaved, savedIds, savingId } = useSaved();
  const { buyTicket, buying } = useTickets();
  const selectedEvent = getEventById(params.id);
  const { inside, checking, sending, toggleAttendance } = useAttendance(selectedEvent?.id);

  const full = selectedEvent ? selectedEvent.occupied >= selectedEvent.capacity : false;
  const closed = selectedEvent?.status === "closed";

  return (
    <PrivateRoute>
      <section className="screen detail">
        {!selectedEvent && loading ? <Loader text="Loading event..." /> : null}
        {!selectedEvent && !loading ? (
          <EmptyState
            title="This event does not exist"
            subtitle="It may have been removed by the venue"
            actionText="Back to Home"
            onAction={() => router.push("/home")}
          />
        ) : null}
        {selectedEvent ? (
          <>
            <div className="hero-photo">
              <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
              <div className="float-actions">
                <button className="round" onClick={() => router.back()} aria-label="Back">
                  <IconBack />
                </button>
                <div className="round-row">
                  <button className="round" aria-label="Share" type="button">
                    <IconShare />
                  </button>
                  <button
                    className="round"
                    onClick={() => toggleSaved(selectedEvent.id)}
                    disabled={savingId === selectedEvent.id}
                    aria-label="Save event"
                  >
                    <IconHeart active={savedIds.includes(selectedEvent.id)} />
                  </button>
                </div>
              </div>
              <StatusBadge status={selectedEvent.status} />
            </div>
            <div className="capacity-row">
              <h1>{selectedEvent.title}</h1>
              <span className="rating">
                <IconStar /> {selectedEvent.rating}
              </span>
            </div>
            <p className="muted">{selectedEvent.venueName}</p>
            <div className="chips wrap">
              {selectedEvent.categories.map((category) => (
                <span key={category} className="chip active">
                  {category[0].toUpperCase() + category.slice(1)}
                </span>
              ))}
            </div>
            <p className="detail-copy">{selectedEvent.description}</p>
            <div className="info-card">
              <div className="info-line">
                <IconCalendar /> {selectedEvent.displayDate}
              </div>
              <div className="info-line">
                <IconClock /> {selectedEvent.displayTime}
              </div>
              <div className="info-line">
                <IconPin /> {selectedEvent.address}
              </div>
            </div>
            <div className="info-card capacity-row">
              <span className="info-line">
                <IconCapacity /> Current capacity
              </span>
              <strong>
                {selectedEvent.occupied}/{selectedEvent.capacity}
              </strong>
            </div>
            <button
              className="btn"
              type="button"
              disabled={checking || sending || closed || (full && !inside)}
              onClick={toggleAttendance}
            >
              {checking ? "Checking..." : null}
              {!checking && sending ? "Sending..." : null}
              {!checking && !sending && inside ? "I left the event" : null}
              {!checking && !sending && !inside && closed ? "Event closed" : null}
              {!checking && !sending && !inside && !closed && full ? "Event is full" : null}
              {!checking && !sending && !inside && !closed && !full ? "I am here" : null}
            </button>
            {selectedEvent.ticket ? (
              <div className="info-card capacity-row">
                <span>
                  Ticket
                  <br />
                  <strong>
                    {selectedEvent.ticket.price} {selectedEvent.ticket.currency}
                  </strong>
                </span>
                <button
                  className="btn small"
                  type="button"
                  disabled={buying}
                  onClick={() => buyTicket(selectedEvent.ticket!.id)}
                >
                  {buying ? "Paying..." : "Buy"}
                </button>
              </div>
            ) : null}
            <button className="btn" onClick={() => router.push(`/directions/${selectedEvent.id}`)}>
              Get Directions
            </button>
          </>
        ) : null}
      </section>
    </PrivateRoute>
  );
}
