import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Sufi Circle — WhatsApp Group Verification",
  description: "Anti-bot verification for the Sufi Circle WhatsApp community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Header */}
        <header
          className="fixed inset-x-0 top-0 z-50 h-[64px] border-b border-black/5
                     bg-white/80 backdrop-blur-md"
          role="banner"
        >
          <div className="max-w-[1100px] mx-auto h-full flex items-center gap-4 px-4">
            <a
              className="font-extrabold text-slate-900"
              href="http://suficircle.moserver.uk/"
              aria-label="Sufi Circle home"
            >
              Sufi Circle
            </a>
            <nav className="ml-auto flex gap-2" aria-label="Primary">
              <a
                className="inline-flex items-center px-3 py-2 rounded-lg text-slate-700 hover:bg-black/5"
                href="/"
              >
                Home
              </a>
              <a
                className="inline-flex items-center px-3 py-2 rounded-lg text-slate-700 hover:bg-black/5"
                href="https://wiki.projectilm.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wiki
              </a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="relative z-10 pt-[calc(64px+120px)] grid place-items-center px-4">
          {children}
        </main>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
