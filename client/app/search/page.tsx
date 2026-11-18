"use client";

import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen/AppScreen";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import { IconClose } from "@/components/Icons/Icons";
import { useEvents } from "@/contexts/EventsProvider";

const categories = ["all", "concert", "party", "rooftop", "bar", "popup"];
const times = ["all", "today", "tonight", "tomorrow", "weekend"];
const statuses = ["all", "live", "open", "almost-full", "closed"];

const label = (value: string) => {
  if (value === "all") return "All";
  if (value === "almost-full") return "Almost full";
  if (value === "popup") return "Pop up";
  if (value === "weekend") return "This weekend";
  return value[0].toUpperCase() + value.slice(1);
};

export default function SearchPage() {
  const router = useRouter();
  const { filters, setFilters, resetFilters, events } = useEvents();

  return (
    <PrivateRoute>
      <AppScreen>
        <button className="icon-btn close-top" onClick={() => router.back()} aria-label="Close filters">
          <IconClose />
        </button>
        <h1 className="page-title center-title">Search y Filter</h1>
        <h3 className="filter-title">Categories</h3>
        <div className="chips wrap">
          {categories.map((item) => (
            <button
              key={item}
              className={`chip ${filters.category === item ? "active" : ""}`}
              onClick={() => setFilters({ category: item })}
            >
              {label(item)}
            </button>
          ))}
        </div>
        <h3 className="filter-title">Time</h3>
        <div className="chips wrap">
          {times.map((item) => (
            <button
              key={item}
              className={`chip ${filters.time === item ? "active" : ""}`}
              onClick={() => setFilters({ time: item })}
            >
              {label(item)}
            </button>
          ))}
        </div>
        <h3 className="filter-title">Status</h3>
        <div className="chips wrap">
          {statuses.map((item) => (
            <button
              key={item}
              className={`chip ${filters.status === item ? "active" : ""}`}
              onClick={() => setFilters({ status: item })}
            >
              {label(item)}
            </button>
          ))}
        </div>
        <h3 className="filter-title">Location</h3>
        <div className="info-card">
          <strong>Near me</strong>
          <div className="capacity-row">
            <span>Distance</span>
            <span>{filters.maxDistance} km</span>
          </div>
          <input
            className="range"
            type="range"
            min={1}
            max={10}
            value={filters.maxDistance}
            aria-label="Distance in kilometers"
            onChange={(e) => setFilters({ maxDistance: Number(e.target.value) })}
          />
        </div>
        <button
          className="btn"
          onClick={() => router.push("/home")}
        >
          Apply Filters
        </button>
        <button
          className="see-all"
          style={{ display: "block", margin: "12px auto" }}
          onClick={resetFilters}
        >
          Clear filters
        </button>
        <p className="demo-note">{events.length} events match these filters.</p>
      </AppScreen>
    </PrivateRoute>
  );
}
