import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JFR Sec | Cybersecurity Portfolio",
    template: "%s | JFR Sec",
  },
  description:
    "Cybersecurity portfolio of JFR Sec — penetration testing labs, network audits, traffic analysis, and risk assessments.",
  metadataBase: new URL("https://jfrsec.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-obsidian-void font-sans">
        <div className="scanline-overlay" />
        <div className="scanline-sweep" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-grid-slate bg-grid opacity-[0.15]" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-radial-fade" />

        <div className="relative z-10 flex min-h-screen w-full max-w-full overflow-x-hidden">
          <Sidebar />
          <div className="flex min-h-screen w-full max-w-full flex-1 flex-col overflow-x-hidden lg:pl-64">
            <TopHeader />
            <main className="w-full max-w-full flex-1 overflow-x-hidden px-4 pb-16 pt-6 sm:px-6 lg:px-10">
              {children}
            </main>
            <footer className="border-t border-slate-border px-4 py-6 font-mono text-xs text-slate-500 sm:px-6 lg:px-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  © {new Date().getFullYear()} JFR_SEC // ALL SYSTEMS LOGGED
                </span>
                <span className="text-slate-600">
                  BUILD::next14-appdir · ENV::production
                </span>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
