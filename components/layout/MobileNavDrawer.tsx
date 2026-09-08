"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-cyan-electric/40 bg-cyan-electric/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-cyan-electric transition-colors hover:border-magenta-hot/40 hover:text-magenta-hot lg:hidden"
      >
        <Menu className="h-3.5 w-3.5" />[ SEC_NAV ]
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] lg:hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-[#060b11]/95 backdrop-blur-xl"
                  aria-hidden
                />
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                  className="relative z-10 flex h-full flex-col px-6 py-6 sm:px-10"
                >
                  <div className="flex items-center justify-between border-b border-slate-border pb-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-electric">
                      Navigation // Console
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-slate-400 transition-colors hover:border-magenta-hot/40 hover:text-magenta-hot"
                    >
                      <X className="h-3.5 w-3.5" />[ CLOSE ]
                    </button>
                  </div>

                  <div className="flex items-center gap-3 pt-5">
                    <Image
                      src="/logo.webp"
                      alt="JFR Sec"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(0,245,212,0.35)]"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-widest text-white">
                        JFR_SEC
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-cyan-400/80">
                        SECOPS CONSOLE
                      </span>
                    </div>
                  </div>
                  <div className="mb-5 mt-3 w-full border-b border-cyan-500/20" />

                  <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
                    {navRoutes.map((route, index) => {
                      const isActive =
                        route.href === "/" ? pathname === "/" : pathname?.startsWith(route.href);
                      const Icon = route.icon;
                      return (
                        <motion.li
                          key={route.href}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: 0.05 + index * 0.04 }}
                        >
                          <Link
                            href={route.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md border px-4 py-3.5 font-mono text-sm transition-colors",
                              isActive
                                ? "border-cyan-electric/40 bg-cyan-electric/[0.08] text-cyan-electric shadow-glow-cyan"
                                : "border-slate-border bg-white/[0.02] text-slate-300 hover:border-cyan-electric/30 hover:text-cyan-electric"
                            )}
                          >
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              {isActive && (
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-electric opacity-75" />
                              )}
                              <span
                                className={cn(
                                  "relative inline-flex h-1.5 w-1.5 rounded-full",
                                  isActive ? "bg-cyan-electric" : "bg-slate-600"
                                )}
                              />
                            </span>
                            <Icon className="h-4 w-4" />
                            <span className="tracking-wider">
                              <span className="text-slate-600">[{route.id}]</span> {route.label}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>

                  <p className="mt-4 border-t border-slate-border pt-4 font-mono text-[10px] uppercase tracking-widest text-slate-600">
                    tap backdrop or press esc to exit
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
