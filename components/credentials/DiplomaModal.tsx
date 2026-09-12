"use client";

import Image from "next/image";
import { GraduationCap, X } from "lucide-react";
import Modal from "@/components/shared/Modal";

export default function DiplomaModal({
  open,
  onClose,
  title,
  imageSrc,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  imageSrc: string;
}) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="diploma-modal-title" className="max-w-3xl">
      <div className="flex items-center justify-between gap-4 border-b border-slate-border px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <GraduationCap className="h-4 w-4 shrink-0 text-cyan-electric" />
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-electric">
              Verified Document
            </p>
            <h2
              id="diploma-modal-title"
              className="truncate font-mono text-sm font-semibold text-slate-100"
            >
              {title}
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
        <div className="relative h-[65vh] w-full overflow-hidden rounded-lg border border-cyan-500/30 bg-obsidian-void shadow-[0_0_25px_rgba(0,245,212,0.2)]">
          <Image src={imageSrc} alt={title} fill className="object-contain p-4" />
        </div>
      </div>
    </Modal>
  );
}
