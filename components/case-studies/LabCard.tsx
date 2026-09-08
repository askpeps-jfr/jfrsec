"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, ExternalLink, Tag } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { severityLabel, severityStyles } from "@/lib/severity";
import { cn } from "@/lib/utils";

export default function LabCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="panel group flex h-full flex-col justify-between px-5 py-5 transition-all hover:border-cyan-electric/40 hover:shadow-glow-dual"
    >
      <Link href={`/case-studies/${study.slug}`} className="block">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
            {study.category}
          </span>
          <span
            className={cn(
              "badge-pill shrink-0",
              severityStyles[study.severity]
            )}
          >
            CVSS {study.cvss.toFixed(1)} · {severityLabel[study.severity]}
          </span>
        </div>

        <h3 className="font-mono text-base font-semibold text-slate-100 group-hover:text-cyan-electric">
          {study.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
          {study.summary}
        </p>
      </Link>

      <div className="mt-5">
        <div className="flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="badge-pill border-slate-border bg-white/[0.02] text-slate-400"
            >
              <Tag className="h-2.5 w-2.5" />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-border pt-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-600">
            <Calendar className="h-3 w-3" />
            {study.date}
          </span>
          <div className="flex items-center gap-3">
            <Link
              href={`/case-studies/${study.slug}`}
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-cyan-electric transition-colors hover:text-cyan-cyber"
            >
              [ READ LOG
              <ArrowUpRight className="h-3 w-3" />]
            </Link>
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-slate-400 transition-colors hover:text-magenta-hot"
            >
              [ VIEW REPO
              <ExternalLink className="h-3 w-3" />]
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
