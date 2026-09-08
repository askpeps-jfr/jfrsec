"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Laptop, Terminal, Zap, type LucideIcon } from "lucide-react";
import type { VmEnvironment } from "@/lib/sandbox";
import CliInspectDrawer from "@/components/sandbox/CliInspectDrawer";

const environmentIcons: Record<string, LucideIcon> = {
  "w2k22-domain-controller": Building2,
  "macos-sonoma-sandbox": Laptop,
  "kali-offensive-platform": Terminal,
};

export default function VmEnvironmentCard({
  environment,
  index = 0,
}: {
  environment: VmEnvironment;
  index?: number;
}) {
  const Icon = environmentIcons[environment.id] ?? Terminal;
  const [inspectOpen, setInspectOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="panel flex h-full flex-col justify-between px-5 py-5"
    >
      <div>
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-cyan-electric/30 bg-cyan-electric/5 text-cyan-electric">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              {environment.os}
            </p>
            <h3 className="font-mono text-sm font-semibold leading-snug text-slate-100">
              {environment.name}
            </h3>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          {environment.tagline}
        </p>

        <dl className="space-y-2 border-t border-slate-border pt-3">
          {environment.specs.map((spec) => (
            <div key={spec.label} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <dt className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-cyan-electric sm:w-36">
                {spec.label}
              </dt>
              <dd className="font-mono text-xs text-slate-300">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-4 border-t border-slate-border pt-3">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {environment.tags.map((tag) => (
            <span
              key={tag}
              className="badge-pill border-slate-border bg-white/[0.02] text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setInspectOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-cyan-electric/40 bg-cyan-electric/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-cyan-electric transition-all hover:border-magenta-hot/40 hover:text-magenta-hot hover:shadow-glow-dual"
        >
          <Zap className="h-3 w-3" />[ INSPECT_CONFIG_LOG ]
        </button>
      </div>

      <CliInspectDrawer
        open={inspectOpen}
        onClose={() => setInspectOpen(false)}
        environmentName={environment.name}
        configLog={environment.configLog}
      />
    </motion.div>
  );
}
