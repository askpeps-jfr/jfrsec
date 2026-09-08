import type { Severity } from "@/lib/case-studies";

export const severityStyles: Record<Severity, string> = {
  critical:
    "border-magenta-critical/40 bg-magenta-critical/10 text-magenta-critical shadow-glow-critical animate-pulse-glow",
  high: "border-orange-500/40 bg-orange-500/10 text-orange-400",
  medium: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  low: "border-emerald-jade/40 bg-emerald-jade/10 text-emerald-jade",
  info: "border-cyan-cyber/40 bg-cyan-cyber/10 text-cyan-cyber",
};

export const severityLabel: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  info: "Info",
};
