import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studyspace — Your learning hub",
  description: "A calm, focused study workspace with subjects, practice quizzes, flashcards, planning, notes, focus sessions and progress tracking.",
  applicationName: "Studyspace",
  manifest: "/manifest.webmanifest",
  themeColor: "#f7f8fa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
