"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { Guard } from "@/components/Guard";
import { StatusBadge } from "@/components/StatusBadge";
import { IconHeart } from "@/components/Icons";
import { useData } from "@/contexts/DataProvider";

export default function SavedEventsPage() {
  const router = useRouter();
  const { savedEvents, savedIds, toggleSaved } = useData();
  const [tab, setTab] = useState<"events" | "venues">("events");

  return (
    <Guard>
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
        {tab === "events" && savedEvents.length === 0 ? (
          <p className="empty">You have no saved events yet. Save one from Home or Event Detail.</p>
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
                <button className="heart" onClick={() => toggleSaved(event.id)} aria-label="Remove from saved">
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
        {tab === "venues" && savedEvents.length === 0 ? (
          <p className="empty">No saved venues yet.</p>
        ) : null}
      </AppScreen>
    </Guard>
  );
}
