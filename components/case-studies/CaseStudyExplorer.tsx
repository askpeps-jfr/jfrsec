"use client";

import { useMemo, useState } from "react";
import { Filter, X } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import LabCard from "@/components/case-studies/LabCard";
import { cn } from "@/lib/utils";

export default function CaseStudyExplorer({
  studies,
  tags,
}: {
  studies: CaseStudy[];
  tags: string[];
}) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (activeTags.length === 0) return studies;
    return studies.filter((s) => activeTags.every((t) => s.tags.includes(t)));
  }, [studies, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          Filter::
        </span>
        {tags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                "badge-pill transition-colors",
                isActive
                  ? "border-cyan-electric/50 bg-cyan-electric/10 text-cyan-electric shadow-glow-cyan"
                  : "border-slate-border bg-white/[0.02] text-slate-400 hover:border-slate-600 hover:text-slate-200"
              )}
            >
              {tag}
            </button>
          );
        })}
        {activeTags.length > 0 && (
          <button
            onClick={() => setActiveTags([])}
            className="badge-pill border-magenta-hot/40 bg-magenta-hot/10 text-magenta-hot"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="panel px-6 py-12 text-center font-mono text-sm text-slate-500">
          No labs match the current filter set.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study) => (
            <LabCard key={study.slug} study={study} />
          ))}
        </div>
      )}
    </div>
  );
}
