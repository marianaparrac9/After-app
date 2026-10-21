"use client";

import type { EventItem } from "@/types/models";

interface MapViewProps {
  events: EventItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  origin?: { lat: number; lng: number } | null;
  destination?: { lat: number; lng: number } | null;
  showRoute?: boolean;
}

const bounds = {
  minLat: 3.44,
  maxLat: 3.462,
  minLng: -76.546,
  maxLng: -76.524,
};

const place = (lat: number, lng: number) => {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
  return {
    x: Math.min(86, Math.max(14, x)),
    y: Math.min(86, Math.max(14, y)),
  };
};

const labelPrefix = (label: string) => {
  if (label === "Rooftop") return "♪ ";
  if (label === "Drinks") return "🍸 ";
  return "";
};

export const MapView = ({
  events,
  selectedId,
  onSelect,
  origin,
  destination,
  showRoute,
}: MapViewProps) => {
  const route = showRoute && origin && destination ? [place(origin.lat, origin.lng), place(destination.lat, destination.lng)] : null;

  return (
    <div className="map-photo-wrap">
      <img className="map-photo" src="/images/map/city-map.png" alt="Mapa de la ciudad" />
      {route ? (
        <svg className="map-route" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={`${route[0].x},${route[0].y} ${route[1].x},${route[1].y}`}
            fill="none"
            stroke="#c218d4"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
      {events.map((event) => {
        const spot = place(event.latitude, event.longitude);
        return (
          <button
            key={event.id}
            type="button"
            className={`map-label map-pin ${selectedId === event.id ? "selected" : ""}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onClick={() => onSelect?.(event.id)}
          >
            {labelPrefix(event.mapLabel)}
            {event.mapLabel}
          </button>
        );
      })}
    </div>
  );
};
