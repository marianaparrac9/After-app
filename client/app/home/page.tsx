"use client";

import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { Guard } from "@/components/Guard";
import { StatusBadge } from "@/components/StatusBadge";
import { AfterLogo } from "@/components/AfterLogo";
import { IconPin, IconSearch } from "@/components/Icons";
import { useData } from "@/contexts/DataProvider";

const categories = ["all", "music", "party", "rooftop", "bar"];

const statusLabel = (status: string) => {
  if (status === "open") return "OPEN";
  if (status === "almost-full") return "ALMOST FULL";
  return status.toUpperCase();
};

export default function HomePage() {
  const router = useRouter();
  const { events, loading, error, loadEvents, filters, toggleSaved, savedIds } = useData();

  const searching = filters.search.trim().length > 0;
  const happening = events.filter((item) => item.section === "happening");
  const tonight = events.filter((item) => item.section === "tonight");
  const trending =
    events.find((item) => item.section === "trending" && item.id === "evt-5") ||
    events.find((item) => item.section === "trending");

  return (
    <Guard>
      <AppScreen>
        <div className="topbar">
          <AfterLogo size="sm" />
          <div className="city-pill">
            <IconPin />
            Cali, valle del cauca
          </div>
        </div>
        <div className="search-box">
          <IconSearch />
          <input
            value={filters.search}
            onChange={(e) => loadEvents({ search: e.target.value, maxDistance: 10 })}
            placeholder="Search events,venus or categories ..."
            aria-label="Search events"
          />
        </div>
        <div className="chips">
          {categories.map((category) => (
            <button
              key={category}
              className={`chip ${filters.category === category ? "active" : ""}`}
              onClick={() => loadEvents({ category, search: filters.search })}
            >
              {category === "all" ? "All" : category[0].toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        {loading ? <p className="status-box">Loading events...</p> : null}
        {error ? <p className="form-error">{error}</p> : null}
        {!loading && events.length === 0 ? <p className="empty">No events match this search.</p> : null}
        {searching
          ? events.map((event) => (
              <article key={event.id} className="event-card">
                <button className="cover" onClick={() => router.push(`/events/${event.id}`)}>
                  <img src={event.imageUrl} alt={event.title} />
                  <StatusBadge status={event.status} />
                </button>
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p className="muted">{event.venueName}</p>
                  <div className="meta-row">
                    <span className="meta-pin">
                      <IconPin /> {event.distanceKm} km
                    </span>
                    <span>
                      {event.occupied}/{event.capacity}
                    </span>
                  </div>
                </div>
              </article>
            ))
          : null}
        {!searching ? (
          <>
            <div className="section-head">
              <h2>Happening Now</h2>
              <button className="see-all" onClick={() => router.push("/search")}>
                See all
              </button>
            </div>
            {happening.map((event) => (
              <article key={event.id} className="event-card">
                <button className="cover" onClick={() => router.push(`/events/${event.id}`)}>
                  <img src={event.imageUrl} alt={event.title} />
                  <StatusBadge status={event.status} />
                </button>
                <div className="card-body">
                  <h3>{event.title}</h3>
                  <p className="muted">{event.venueName}</p>
                  <div className="meta-row">
                    <span className="meta-pin">
                      <IconPin /> {event.distanceKm} km
                    </span>
                    <span>
                      {event.occupied}/{event.capacity}
                    </span>
                  </div>
                </div>
              </article>
            ))}
            <div className="section-head">
              <h2>Tonight's Pick ✨</h2>
            </div>
            <div className="tonight-grid">
              {tonight.slice(0, 2).map((event) => (
                <button
                  key={event.id}
                  className="mini-card"
                  onClick={() => router.push(`/events/${event.id}`)}
                >
                  <img src={event.imageUrl} alt={event.title} />
                  <span className={`mini-badge badge ${event.status}`}>{statusLabel(event.status)}</span>
                  <div className="overlay">
                    <h3>{event.title}</h3>
                    <p>
                      {event.venueName} · {event.distanceKm} km
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {trending ? (
              <article className="promo">
                <button className="promo-frame" onClick={() => router.push(`/events/${trending.id}`)}>
                  <img className="promo-art" src="/retro.png" alt="Retro Night" />
                </button>
                <button className="btn small promo-save" onClick={() => toggleSaved(trending.id)}>
                  {savedIds.includes(trending.id) ? "Saved" : "Save Event"}
                </button>
              </article>
            ) : null}
          </>
        ) : null}
      </AppScreen>
    </Guard>
  );
}
