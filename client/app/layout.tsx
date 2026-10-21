import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { PhoneShell } from "@/components/PhoneShell";

export const metadata: Metadata = {
  title: "After",
  description: "Discover after dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PhoneShell>{children}</PhoneShell>
        </Providers>
      </body>
    </html>
  );
}
