"use client";

import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { Guard } from "@/components/Guard";
import { IconBell, IconGear, IconHeart, IconHelp } from "@/components/Icons";
import { useAuth } from "@/contexts/AuthProvider";
import { useData } from "@/contexts/DataProvider";
import { useState } from "react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { savedIds, payments } = useData();
  const myPayments = payments.filter((item) => item.clientId === user?.id);
  const router = useRouter();
  const [panel, setPanel] = useState("");

  if (!user) return null;

  return (
    <Guard>
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
            <strong>{myPayments.length}</strong>
            Visited
          </div>
          <div>
            <strong>2</strong>
            Badges
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
    </Guard>
  );
}
