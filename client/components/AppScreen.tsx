"use client";

import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export const AppScreen = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={`screen with-nav ${className}`}>
      <div className="screen-scroll">{children}</div>
      <BottomNav />
    </section>
  );
};
