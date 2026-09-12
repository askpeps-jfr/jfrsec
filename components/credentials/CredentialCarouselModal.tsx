"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GraduationCap, X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { CourseCertificate } from "@/lib/credentials";

export default function CredentialCarouselModal({
  open,
  onClose,
  programTitle,
  certificates,
}: {
  open: boolean;
  onClose: () => void;
  programTitle: string;
  certificates: CourseCertificate[];
}) {
  const [index, setIndex] = useState(0);
  const total = certificates.length;

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  useEffect(() => {
    if (!open || total === 0) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, total]);

  if (total === 0) return null;
  const current = certificates[index];
  const moduleLabel = `MODULE ${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} VERIFIED`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="credential-carousel-title"
      className="max-w-3xl"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-border px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <GraduationCap className="h-4 w-4 shrink-0 text-cyan-electric" />
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-electric">
              Verified Course Certificate
            </p>
            <h2
              id="credential-carousel-title"
              className="truncate font-mono text-sm font-semibold text-slate-100"
            >
              {programTitle}
            </h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-slate-400 transition-colors hover:border-magenta-hot/40 hover:text-magenta-hot"
        >
          <X className="h-3.5 w-3.5" />[ ESC / CLOSE ]
        </button>
      </div>

      <div className="p-4 sm:p-6">
        <div className="relative h-[55vh] w-full overflow-hidden rounded-lg border border-cyan-500/30 bg-obsidian-void shadow-[0_0_25px_rgba(0,245,212,0.2)]">
          <span className="badge-pill absolute right-3 top-3 z-10 border-cyan-electric/40 bg-obsidian-void/85 text-cyan-electric backdrop-blur-sm">
            {moduleLabel}
          </span>
          <Image
            key={current.image}
            src={current.image}
            alt={current.title}
            fill
            className="object-contain p-4"
          />

          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            aria-label="Previous certificate"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-cyan-electric/30 bg-obsidian-void/80 p-2 text-cyan-electric transition-colors hover:border-magenta-hot/40 hover:text-magenta-hot"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % total)}
            aria-label="Next certificate"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-cyan-electric/30 bg-obsidian-void/80 p-2 text-cyan-electric transition-colors hover:border-magenta-hot/40 hover:text-magenta-hot"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-slate-400 transition-colors hover:text-cyan-electric"
          >
            <ChevronLeft className="h-3.5 w-3.5 shrink-0" />[ PREV ]
          </button>
          <p className="min-w-0 truncate text-center font-mono text-sm text-slate-200">
            {current.title}
          </p>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % total)}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-slate-400 transition-colors hover:text-cyan-electric"
          >
            [ NEXT ]
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5">
          {certificates.map((cert, i) => (
            <button
              key={cert.image}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to module ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-cyan-electric" : "w-1.5 bg-slate-border hover:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
