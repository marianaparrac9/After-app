"use client";

import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen/AppScreen";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import { IconBell, IconGear, IconHeart, IconHelp } from "@/components/Icons/Icons";
import { useAuth } from "@/contexts/AuthProvider";
import { useSaved } from "@/contexts/SavedProvider";
import { useTickets } from "@/contexts/TicketsProvider";
import { useState } from "react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { savedIds } = useSaved();
  const { payments } = useTickets();
  const visited = new Set(payments.map((item) => item.product.eventId)).size;
  const router = useRouter();
  const [panel, setPanel] = useState("");

  if (!user) return <PrivateRoute>{null}</PrivateRoute>;

  return (
    <PrivateRoute>
      <AppScreen>
        <h1 className="page-title" style={{ textAlign: "center" }}>
          Profile
        </h1>
        <div className="profile-hero">
          {user.avatarUrl ? (
            <img className="avatar" src={user.avatarUrl} alt={user.fullName} />
          ) : (
            <div className="avatar" style={{ display: "grid", placeItems: "center", background: "#f3d4f6" }}>
              {user.fullName.slice(0, 1)}
            </div>
          )}
          <h2>{user.fullName}</h2>
          <p className="muted">@{user.username}</p>
        </div>
        <div className="stats">
          <div>
            <strong>{savedIds.length}</strong>
            Saved
          </div>
          <div>
            <strong>{payments.length}</strong>
            Tickets
          </div>
          <div>
            <strong>{visited}</strong>
            Visited
          </div>
        </div>
        <button className="menu-card" onClick={() => router.push("/saved-events")}>
          <span className="menu-icon">
            <IconHeart />
          </span>
          <span style={{ flex: 1 }}>
            <strong>My Events</strong>
            <p className="muted">See your upcoming events</p>
          </span>
          <span className="chevron">›</span>
        </button>
        <button className="menu-card" onClick={() => setPanel("Notifications")}>
          <span className="menu-icon">
            <IconBell />
          </span>
          <span style={{ flex: 1 }}>
            <strong>Notifications</strong>
            <p className="muted">Event updates and alerts</p>
          </span>
          <span className="chevron">›</span>
        </button>
        <button className="menu-card" onClick={() => setPanel("Settings")}>
          <span className="menu-icon">
            <IconGear />
          </span>
          <span style={{ flex: 1 }}>
            <strong>Settings</strong>
            <p className="muted">Location, privacy, preferences</p>
          </span>
          <span className="chevron">›</span>
        </button>
        <button className="menu-card" onClick={() => setPanel("Help & Support")}>
          <span className="menu-icon">
            <IconHelp />
          </span>
          <span style={{ flex: 1 }}>
            <strong>Help & Support</strong>
            <p className="muted">FAQ, contact us</p>
          </span>
          <span className="chevron">›</span>
        </button>
        {panel ? <p className="status-box">{panel}</p> : null}
        <button className="btn logout-btn" onClick={logout}>
          Log Out
        </button>
      </AppScreen>
    </PrivateRoute>
  );
}
