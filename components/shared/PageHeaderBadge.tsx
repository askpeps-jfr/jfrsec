import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PageHeaderBadge({
  icon: Icon,
  index,
  label,
  className,
}: {
  icon: LucideIcon;
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-1 font-mono text-xs text-cyan-400",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />[{index}] {label}
    </p>
  );
}
