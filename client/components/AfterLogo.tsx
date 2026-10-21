"use client";

import { useRouter } from "next/navigation";

export const AfterLogo = ({ size = "lg" }: { size?: "lg" | "sm" }) => {
  const router = useRouter();
  const src = size === "sm" ? "/images/brand/logo-after-sm.png" : "/images/brand/logo-after.png";

  return (
    <button
      type="button"
      className={size === "sm" ? "logo-btn sm" : "logo-btn"}
      onClick={() => router.push("/home")}
      aria-label="Go to Home"
    >
      <img src={src} alt="After" />
      {size === "lg" ? <p className="tagline">Discover after dark</p> : null}
    </button>
  );
};
