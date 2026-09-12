"use client";

import { Terminal, X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { ConfigLog } from "@/lib/sandbox";

export default function CliInspectDrawer({
  open,
  onClose,
  environmentName,
  configLog,
}: {
  open: boolean;
  onClose: () => void;
  environmentName: string;
  configLog: ConfigLog;
}) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="cli-inspect-title" className="max-w-3xl">
      <div className="flex items-center justify-between gap-4 border-b border-slate-border px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Terminal className="h-4 w-4 shrink-0 text-cyan-electric" />
          <div className="min-w-0">
            <p className="truncate font-mono text-[10px] uppercase tracking-widest text-cyan-electric">
              Config Log // {environmentName}
            </p>
            <h2
              id="cli-inspect-title"
              className="truncate font-mono text-sm font-semibold text-slate-100"
            >
              {configLog.filename}
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-slate-400 transition-colors hover:border-magenta-hot/40 hover:text-magenta-hot"
        >
          <X className="h-3.5 w-3.5" />[ CLOSE ]
        </button>
      </div>

      <div className="max-h-[65vh] overflow-y-auto px-5 py-5">
        <pre className="overflow-x-auto whitespace-pre rounded-lg border border-slate-border bg-obsidian-void px-4 py-3.5 font-mono text-[12px] leading-relaxed text-cyan-electric">
          {configLog.content}
        </pre>
      </div>

      <div className="border-t border-slate-border px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
          esc or backdrop click to exit
        </p>
      </div>
    </Modal>
  );
}
