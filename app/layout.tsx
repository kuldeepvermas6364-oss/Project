import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loop Social",
  description: "A mixed social media app inspired by Instagram, Twitter, and Snapchat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
