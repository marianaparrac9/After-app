"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Guard } from "@/components/Guard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  IconBack,
  IconCalendar,
  IconCapacity,
  IconClock,
  IconHeart,
  IconPin,
  IconShare,
  IconStar,
} from "@/components/Icons";
import { useData } from "@/contexts/DataProvider";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { loadEventById, selectedEvent, toggleSaved, savedIds, products } = useData();
  const product = selectedEvent
    ? products.find((item) => item.name === selectedEvent.title)
    : null;

  useEffect(() => {
    if (params.id) loadEventById(params.id);
  }, [params.id]);

  return (
    <Guard>
      <section className="screen detail">
        {!selectedEvent ? (
          <div className="empty">
            <p>This event id does not exist.</p>
            <button className="btn" onClick={() => router.push("/home")}>
              Back to Home
            </button>
          </div>
        ) : (
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
            {product ? (
              <div className="info-card capacity-row">
                <span>Ticket</span>
                <strong>
                  {product.price} {product.currency}
                </strong>
              </div>
            ) : null}
            <button className="btn" onClick={() => router.push(`/directions/${selectedEvent.id}`)}>
              Get Directions
            </button>
          </>
        )}
      </section>
    </Guard>
  );
}
