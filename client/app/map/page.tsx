"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AppScreen } from "@/components/AppScreen/AppScreen";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { IconBack, IconCapacity, IconFilter, IconSearch } from "@/components/Icons/Icons";
import { useEvents } from "@/contexts/EventsProvider";

const MapView = dynamic(() => import("@/components/MapView/MapView").then((mod) => mod.MapView), {
  ssr: false,
});

export default function MapPage() {
  const router = useRouter();
  const { allEvents } = useEvents();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "live" | "open">("all");
  const [selectedId, setSelectedId] = useState("");

  const visible = useMemo(() => {
    return allEvents.filter((item) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.venueName.toLowerCase().includes(q) ||
        item.mapLabel.toLowerCase().includes(q);
      const matchesStatus = status === "all" || item.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [allEvents, query, status]);

  const selected = visible.find((item) => item.id === selectedId) || visible[0];

  return (
    <PrivateRoute>
      <AppScreen className="map-screen">
        <div className="map-search">
          <button className="icon-btn" onClick={() => router.push("/home")} aria-label="Back">
            <IconBack />
          </button>
          <div className="search-box">
            <IconSearch />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in this area..."
              aria-label="Search in this area"
            />
          </div>
          <button className="icon-btn filled" onClick={() => router.push("/search")} aria-label="Filters">
            <IconFilter />
          </button>
        </div>
        <div className="chips">
          <button
            className={`chip live-chip ${status === "live" ? "active" : ""}`}
            onClick={() => setStatus(status === "live" ? "all" : "live")}
          >
            LIVE <span className="dot" />
          </button>
          <button
            className={`chip open-chip ${status === "open" ? "active" : ""}`}
            onClick={() => setStatus(status === "open" ? "all" : "open")}
          >
            OPEN
          </button>
        </div>
        <div className="map-canvas">
          <MapView events={visible} selectedId={selected?.id} onSelect={setSelectedId} />
        </div>
        {selected ? (
          <div className="map-sheet">
            <img src={selected.imageUrl} alt={selected.venueName} />
            <div className="sheet-copy">
              <div className="sheet-top">
                <StatusBadge status={selected.status} className="static" />
                <span>
                  <IconCapacity /> {selected.occupied}/{selected.capacity}
                </span>
              </div>
              <strong>{selected.venueName}</strong>
              <p className="muted">
                {selected.distanceKm} km {selected.title}
              </p>
              <button className="btn small" onClick={() => router.push(`/events/${selected.id}`)}>
                View Event
              </button>
            </div>
          </div>
        ) : (
          <p className="empty">No events in this area.</p>
        )}
      </AppScreen>
    </PrivateRoute>
  );
}
