"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen/AppScreen";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { IconHeart } from "@/components/Icons/Icons";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Loader } from "@/components/Loader/Loader";
import { useSaved } from "@/contexts/SavedProvider";

export default function SavedEventsPage() {
  const router = useRouter();
  const { savedEvents, savedIds, toggleSaved, loading, savingId, error } = useSaved();
  const [tab, setTab] = useState<"events" | "venues">("events");

  return (
    <PrivateRoute>
      <AppScreen>
        <h1 className="page-title" style={{ textAlign: "center" }}>
          Saved Events
        </h1>
        <div className="tabs">
          <button className={tab === "events" ? "active" : ""} onClick={() => setTab("events")}>
            Events
          </button>
          <button className={tab === "venues" ? "active" : ""} onClick={() => setTab("venues")}>
            Venues
          </button>
        </div>
        {loading && savedEvents.length === 0 ? <Loader text="Loading saved events..." /> : null}
        {error ? <EmptyState title="We could not load your saved events" subtitle={error} /> : null}
        {!loading && !error && tab === "events" && savedEvents.length === 0 ? (
          <EmptyState
            title="You have no saved events yet"
            subtitle="Save one from Home or Event Detail"
            actionText="Explore events"
            onAction={() => router.push("/home")}
          />
        ) : null}
        {tab === "events"
          ? savedEvents.map((event) => (
              <article key={event.id} className="saved-card">
                <button className="ghost" onClick={() => router.push(`/events/${event.id}`)}>
                  <img src={event.imageUrl} alt={event.title} />
                </button>
                <button className="ghost" onClick={() => router.push(`/events/${event.id}`)}>
                  <div className="sheet-top">
                    <StatusBadge status={event.status} className="static" />
                    <span className="muted">
                      {event.distanceKm} km · {event.occupied}/{event.capacity}
                    </span>
                  </div>
                  <strong>{event.title}</strong>
                  <p className="muted">{event.venueName}</p>
                </button>
                <button
                  className="heart"
                  onClick={() => toggleSaved(event.id)}
                  disabled={savingId === event.id}
                  aria-label="Remove from saved"
                >
                  <IconHeart active={savedIds.includes(event.id)} />
                </button>
              </article>
            ))
          : null}
        {tab === "venues"
          ? savedEvents.map((event) => (
              <article key={event.venueName} className="saved-card">
                <img src={event.imageUrl} alt={event.venueName} />
                <div>
                  <strong>{event.venueName}</strong>
                  <p className="muted">{event.address}</p>
                </div>
              </article>
            ))
          : null}
        {!loading && tab === "venues" && savedEvents.length === 0 ? <EmptyState title="No saved venues yet" /> : null}
      </AppScreen>
    </PrivateRoute>
  );
}
