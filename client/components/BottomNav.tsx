"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconHeart, IconHome, IconMap, IconUser } from "./Icons";

const items = [
  { href: "/home", label: "Home", key: "home" },
  { href: "/saved-events", label: "Saved", key: "saved" },
  { href: "/map", label: "Map", key: "map" },
  { href: "/profile", label: "Profile", key: "profile" },
];

export const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="bottom-nav" aria-label="Main">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.key === "map" && pathname.startsWith("/directions"));
        return (
          <button
            key={item.href}
            className={`nav-item ${active ? "active" : ""}`}
            onClick={() => router.push(item.href)}
            aria-current={active ? "page" : undefined}
          >
            {item.key === "home" ? <IconHome active={active} /> : null}
            {item.key === "saved" ? <IconHeart active={active} /> : null}
            {item.key === "map" ? <IconMap active={active} /> : null}
            {item.key === "profile" ? <IconUser active={active} /> : null}
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};
