"use client";

import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AppScreen } from "@/components/AppScreen/AppScreen";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import { IconClose, IconPin } from "@/components/Icons/Icons";
import { Loader } from "@/components/Loader/Loader";
import { useEvents } from "@/contexts/EventsProvider";

const MapView = dynamic(() => import("@/components/MapView/MapView").then((mod) => mod.MapView), {
  ssr: false,
});

export default function DirectionsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getEventById, loading } = useEvents();
  const selectedEvent = getEventById(params.id);

  return (
    <PrivateRoute>
      <AppScreen className="map-screen">
        <button className="icon-btn close-top" onClick={() => router.back()} aria-label="Close">
          <IconClose />
        </button>
        {!selectedEvent && loading ? <Loader text="Loading destination..." /> : null}
        {!selectedEvent && !loading ? <p className="empty">This destination does not exist.</p> : null}
        {selectedEvent ? (
          <>
            <div className="map-canvas" style={{ height: 390, marginTop: 8 }}>
              <div className="route-card">
                <div className="tiny">ORIGIN</div>
                <div>Your Location</div>
                <div className="tiny" style={{ marginTop: 8 }}>
                  DESTINATION
                </div>
                <strong>{selectedEvent.venueName}</strong>
              </div>
              <MapView
                events={[
                  {
                    id: selectedEvent.id,
                    latitude: selectedEvent.latitude,
                    longitude: selectedEvent.longitude,
                    mapLabel: selectedEvent.mapLabel || selectedEvent.venueName,
                  },
                ]}
                selectedId={selectedEvent.id}
              />
            </div>
            <div
              className="map-sheet"
              style={{ position: "relative", bottom: "auto", left: "auto", right: "auto", marginTop: 12 }}
            >
              <img src={selectedEvent.imageUrl} alt={selectedEvent.venueName} />
              <div>
                <strong>{selectedEvent.venueName}</strong>
                <p className="muted">{selectedEvent.distanceKm} Km 4min away</p>
                <button className="btn small" type="button">
                  Start Walking
                </button>
              </div>
            </div>
            <div className="info-card">
              <strong>Location</strong>
              <p className="info-line">
                <IconPin /> {selectedEvent.address}
              </p>
            </div>
          </>
        ) : null}
      </AppScreen>
    </PrivateRoute>
  );
}
