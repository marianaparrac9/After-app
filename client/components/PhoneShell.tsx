"use client";

import { ReactNode } from "react";

export const PhoneShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="desktop-frame">
      <div className="phone">{children}</div>
    </div>
  );
};
