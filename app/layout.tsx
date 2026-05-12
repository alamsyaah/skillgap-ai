import type { Metadata } from "next";
import "./globals.css";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "SkillGap AI — Diagnostic Assessment",
  description: "Diagnostic skill assessment that finds why gaps exist, not just that they do.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
