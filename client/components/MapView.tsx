"use client";

import { useEffect, useRef } from "react";
import type { EventItem } from "@/types/models";

interface MapViewProps {
  events: EventItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  origin?: { lat: number; lng: number } | null;
  destination?: { lat: number; lng: number } | null;
  showRoute?: boolean;
}

export const MapView = ({
  events,
  selectedId,
  onSelect,
  origin,
  destination,
  showRoute,
}: MapViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;

  useEffect(() => {
    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    const start = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (!ref.current || cancelled) return;
      ref.current.innerHTML = "";

      const center = destination || origin || { lat: 3.4516, lng: -76.532 };
      map = L.map(ref.current, { zoomControl: false }).setView([center.lat, center.lng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      events.forEach((event) => {
        const html = `<div class="map-label">${event.mapLabel === "Rooftop" ? "♪ " : event.mapLabel === "Drinks" ? "🍸 " : ""}${event.mapLabel}</div>`;
        const icon = L.divIcon({
          className: "",
          html,
          iconSize: [110, 28],
          iconAnchor: [55, 14],
        });
        const marker = L.marker([event.latitude, event.longitude], { icon }).addTo(
          map as import("leaflet").Map
        );
        marker.on("click", () => selectRef.current?.(event.id));
        if (selectedId === event.id) {
          L.circleMarker([event.latitude, event.longitude], {
            radius: 18,
            color: "#b026ff",
            fillColor: "#b026ff",
            fillOpacity: 0.22,
          }).addTo(map as import("leaflet").Map);
        }
      });

      if (origin) {
        const pin = L.divIcon({
          className: "",
          html: `<div style="width:18px;height:18px;border-radius:50%;background:#c218d4;border:3px solid #fff;box-shadow:0 0 0 8px rgba(194,24,212,.25)"></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });
        L.marker([origin.lat, origin.lng], { icon: pin }).addTo(map);
      }

      if (showRoute && origin && destination) {
        const mid = {
          lat: (origin.lat + destination.lat) / 2 + 0.003,
          lng: (origin.lng + destination.lng) / 2 - 0.004,
        };
        L.polyline(
          [
            [origin.lat, origin.lng],
            [mid.lat, mid.lng],
            [destination.lat, destination.lng],
          ],
          { color: "#c218d4", weight: 7, opacity: 0.9 }
        ).addTo(map);
        L.circleMarker([destination.lat, destination.lng], {
          radius: 12,
          color: "#c218d4",
          fillColor: "#c218d4",
          fillOpacity: 0.85,
        }).addTo(map);
        map.fitBounds(
          [
            [origin.lat, origin.lng],
            [destination.lat, destination.lng],
          ],
          { padding: [50, 50] }
        );
      }
    };

    void start();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [events, selectedId, origin, destination, showRoute]);

  return <div ref={ref} style={{ height: "100%", width: "100%" }} />;
};
