"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
interface MapTag {
  id: string;
  latitude: number;
  longitude: number;
  mapLabel: string;
}

interface MapPoint {
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  events?: MapTag[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  picked?: MapPoint | null;
  onPick?: (point: MapPoint) => void;
}

const labelPrefix = (label: string) => {
  if (label === "Rooftop") return "♪ ";
  if (label === "Drinks") return "🍸 ";
  return "";
};

export const MapView = ({ events = [], selectedId, onSelect, picked, onPick }: MapViewProps) => {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const onSelectRef = useRef(onSelect);
  const onPickRef = useRef(onPick);
  onSelectRef.current = onSelect;
  onPickRef.current = onPick;

  useEffect(() => {
    if (!box.current || mapRef.current) return;

    const map = L.map(box.current, { attributionControl: false }).setView([3.4516, -76.532], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    mapRef.current = map;
    map.on("click", (event: L.LeafletMouseEvent) => {
      onPickRef.current?.({ latitude: event.latlng.lat, longitude: event.latlng.lng });
    });

    const pick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement | null)?.closest?.("[data-id]");
      const id = button?.getAttribute("data-id");
      if (id) onSelectRef.current?.(id);
    };
    box.current.addEventListener("click", pick);

    const frame = requestAnimationFrame(() => map.invalidateSize());
    return () => {
      cancelAnimationFrame(frame);
      box.current?.removeEventListener("click", pick);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const layer = L.layerGroup().addTo(map);
    events.forEach((event) => {
      const selected = event.id === selectedId;
      const icon = L.divIcon({
        className: "map-label-icon",
        html: `<button type="button" data-id="${event.id}" class="map-label${selected ? " selected" : ""}">${labelPrefix(event.mapLabel)}${event.mapLabel}</button>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      const marker = L.marker([event.latitude, event.longitude], { icon }).addTo(layer);
      marker.on("click", () => onSelectRef.current?.(event.id));
      marker.getElement()?.querySelector("button")?.addEventListener("click", () => {
        onSelectRef.current?.(event.id);
      });
    });

    return () => {
      layer.remove();
    };
  }, [events, selectedId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !picked) return;

    const marker = L.circleMarker([picked.latitude, picked.longitude], {
      radius: 9,
      color: "#ffffff",
      weight: 3,
      fillColor: "#c026d3",
      fillOpacity: 1,
    }).addTo(map);

    return () => {
      marker.remove();
    };
  }, [picked]);

  return <div ref={box} className="leaflet-map" />;
};
