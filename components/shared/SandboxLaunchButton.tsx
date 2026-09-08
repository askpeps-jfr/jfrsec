"use client";

import { useState } from "react";
import { ExternalLink, TerminalSquare } from "lucide-react";
import SandboxModal, { type SandboxContext } from "@/components/shared/SandboxModal";
import { cn } from "@/lib/utils";

export default function SandboxLaunchButton({
  context,
  className,
}: {
  context: SandboxContext;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center gap-2 rounded-md border border-cyan-electric/40 bg-cyan-electric/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-electric shadow-glow-cyan transition-all hover:border-magenta-hot/50 hover:text-magenta-hot hover:shadow-glow-dual",
          className
        )}
      >
        <TerminalSquare className="h-3.5 w-3.5" />[ LAUNCH LIVE SANDBOX
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />]
      </button>

      <SandboxModal open={open} onClose={() => setOpen(false)} context={context} />
    </>
  );
}
