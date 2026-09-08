"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { navRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-slate-border bg-slate-surface/80 backdrop-blur-md lg:flex">
      <div className="flex items-center gap-2.5 border-b border-slate-border px-5 py-5">
        <Link href="/" className="shrink-0 transition-[filter] duration-300 hover:drop-shadow-[0_0_12px_rgba(0,245,212,0.6)]">
          <Image
            src="/logo.webp"
            alt="JFR Sec logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
        </Link>
        <div className="font-mono leading-tight">
          <p className="text-sm font-semibold tracking-wider text-slate-100">
            JFR<span className="text-cyan-electric">_SEC</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            console v2.4
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6">
        <p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
          Navigation
        </p>
        <ul className="space-y-1.5">
          {navRoutes.map((route) => {
            const isActive =
              route.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(route.href);
            const Icon = route.icon;

            return (
              <li key={route.href} className="relative">
                <Link
                  href={route.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 font-mono text-sm transition-colors",
                    isActive
                      ? "border-cyan-electric/30 bg-cyan-electric/[0.06] text-cyan-electric"
                      : "text-slate-400 hover:border-slate-border hover:bg-white/[0.02] hover:text-slate-200"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-glow"
                      className="absolute inset-0 rounded-md shadow-glow-cyan"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 h-1.5 w-1.5 rounded-full",
                      isActive
                        ? "bg-cyan-electric shadow-glow-cyan"
                        : "bg-slate-700 group-hover:bg-slate-500"
                    )}
                  />
                  <Icon
                    className={cn(
                      "relative z-10 h-4 w-4",
                      isActive ? "text-cyan-electric" : "text-slate-500 group-hover:text-slate-300"
                    )}
                  />
                  <span className="relative z-10 tracking-wider">
                    <span className="text-slate-600">[{route.id}]</span>{" "}
                    {route.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-border px-5 py-4">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-emerald-jade" />
          uplink secure
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 transition-colors hover:text-cyan-electric"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 transition-colors hover:text-cyan-electric"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}
