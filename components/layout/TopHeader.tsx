"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, Radar, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNavDrawer from "@/components/layout/MobileNavDrawer";

const THREAT_LEVELS = ["LOW", "ELEVATED", "CRITICAL"] as const;

function formatUtc(date: Date) {
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  const y = date.getUTCFullYear();
  const mo = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return { time: `${hh}:${mm}:${ss}`, date: `${y}-${mo}-${d}` };
}

export default function TopHeader() {
  const [now, setNow] = useState<Date | null>(null);
  const [threatIndex, setThreatIndex] = useState(0);
  const threatLevel = THREAT_LEVELS[threatIndex];
  const isCritical = threatLevel === "CRITICAL";

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const stamp = now ? formatUtc(now) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-border bg-[#01080c]/90 md:bg-obsidian-void/80 md:backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-2 font-mono text-xs sm:gap-2.5">
          <Link
            href="/"
            aria-label="JFR Sec — Home"
            className="flex shrink-0 items-center sm:hidden"
          >
            <Image
              src="/logo.webp"
              alt="JFR Sec"
              width={28}
              height={28}
              className="h-7 w-7 object-contain drop-shadow-[0_0_6px_rgba(20,241,149,0.35)]"
            />
          </Link>
          <MobileNavDrawer />
          <span className="badge-pill shrink-0 border-emerald-jade/30 bg-emerald-jade/10 text-emerald-jade">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-jade opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-jade" />
            </span>
            <span className="hidden sm:inline">STATUS: NOMINAL</span>
          </span>
          <button
            type="button"
            onClick={() => setThreatIndex((i) => (i + 1) % THREAT_LEVELS.length)}
            title="Toggle simulated threat level"
            className={cn(
              "hidden items-center gap-1.5 rounded px-1.5 py-0.5 transition-all sm:flex",
              isCritical
                ? "animate-pulse-glow text-magenta-critical shadow-glow-critical"
                : "text-slate-500 hover:text-magenta-hot hover:shadow-glow-magenta"
            )}
          >
            <Radar className="h-3.5 w-3.5" />
            THREAT_LEVEL: {threatLevel}
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-4 font-mono text-xs text-slate-400">
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-electric opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-electric" />
            </span>
            <Wifi className="h-3.5 w-3.5 text-cyan-electric" />
            <span className="text-slate-500">LINK::</span>
            <span className="text-cyan-electric">LIVE ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-slate-border bg-slate-surface px-3 py-1.5">
            <Activity className="h-3.5 w-3.5 text-cyan-cyber" />
            <span suppressHydrationWarning className="tabular-nums text-slate-200">
              {stamp ? stamp.time : "--:--:--"}
            </span>
            <span className="hidden text-slate-600 sm:inline" suppressHydrationWarning>
              {stamp ? stamp.date : "----:--:--"} UTC
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
