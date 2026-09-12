import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ClipboardList,
  Clock,
  Crosshair,
  ExternalLink,
  FileText,
  Fingerprint,
  LayoutGrid,
  ListChecks,
  ShieldAlert,
  Target,
  Terminal,
  Wrench,
} from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { severityLabel, severityStyles } from "@/lib/severity";
import { cn } from "@/lib/utils";
import SandboxLaunchButton from "@/components/shared/SandboxLaunchButton";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: study.title,
    description: study.summary,
  };
}

const riskStyles: Record<string, string> = {
  Critical:
    "border-magenta-critical/40 bg-magenta-critical/10 text-magenta-critical shadow-glow-critical animate-pulse-glow",
  High: "border-orange-500/40 bg-orange-500/10 text-orange-400",
  Medium: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Low: "border-emerald-jade/40 bg-emerald-jade/10 text-emerald-jade",
};

export default function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const sampleArtifact = study.iocs?.length
    ? study.iocs.map((ioc) => `${ioc.type}: ${ioc.value}  // ${ioc.description}`).join("\n")
    : undefined;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 overflow-x-hidden">
      <Link
        href="/case-studies"
        className="inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-electric"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to catalog
      </Link>

      <header>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-electric">
            {study.category}
          </span>
          <span className={cn("badge-pill", severityStyles[study.severity])}>
            <ShieldAlert className="h-3 w-3" />
            CVSS {study.cvss.toFixed(1)} · {severityLabel[study.severity]}
          </span>
        </div>
        <h1 className="break-words font-mono text-3xl font-bold text-slate-50 sm:text-4xl">
          {study.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {study.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-4 font-mono text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {study.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {study.duration}
          </span>
        </div>

        <div className="mt-4 flex max-w-full flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="badge-pill border-slate-border bg-white/[0.02] text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex max-w-full flex-wrap gap-3">
          <SandboxLaunchButton
            context={{
              title: study.title,
              commands: study.commandLog,
              sampleArtifact,
            }}
          />
          <a
            href={study.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-slate-border bg-white/[0.02] px-4 py-2 font-mono text-xs uppercase tracking-widest text-slate-300 transition-all hover:border-magenta-hot/40 hover:text-magenta-hot hover:shadow-glow-dual"
          >
            [ VIEW REPO
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />]
          </a>
        </div>
      </header>

      <section className="panel border-cyan-electric/20 px-6 py-5">
        <SectionTitle icon={FileText} label="Executive Summary" />
        <p className="mt-3 break-words text-sm leading-relaxed text-slate-300">
          {study.executiveSummary}
        </p>
      </section>

      <section className="panel px-6 py-5">
        <SectionTitle icon={Crosshair} label="Scope" />
        <ul className="mt-3 space-y-2">
          {study.scope.map((item) => (
            <li key={item} className="flex items-start gap-2.5 break-words text-sm text-slate-400">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-electric" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel px-6 py-5">
        <SectionTitle icon={ClipboardList} label="Overview" />
        <p className="mt-3 break-words text-sm leading-relaxed text-slate-400">
          {study.overview}
        </p>
      </section>

      <section className="panel px-6 py-5">
        <SectionTitle icon={Target} label="Objectives" />
        <ul className="mt-3 space-y-2">
          {study.objectives.map((obj) => (
            <li key={obj} className="flex items-start gap-2.5 break-words text-sm text-slate-400">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-electric" />
              {obj}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel px-6 py-5">
        <SectionTitle icon={ListChecks} label="Methodology" />
        <ol className="mt-3 space-y-2">
          {study.methodology.map((step, i) => (
            <li key={step} className="flex items-start gap-3 break-words text-sm text-slate-400">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-electric/30 font-mono text-[10px] text-cyan-electric">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="w-full max-w-full">
        <SectionTitle icon={Terminal} label="Command Log" />
        <div className="mt-3 w-full max-w-full overflow-hidden rounded-lg border border-slate-border bg-obsidian-void">
          <div className="flex items-center gap-1.5 border-b border-slate-border bg-slate-surface px-4 py-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-magenta-hot/70" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-jade/70" />
            <span className="ml-2 truncate font-mono text-[11px] text-slate-500">
              session_log.sh
            </span>
          </div>
          <div className="space-y-5 overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed">
            {study.commandLog.map((entry, i) => (
              <div key={i} className="min-w-0">
                <p className="break-words text-slate-600"># {entry.comment}</p>
                <p className="break-words text-cyan-electric">
                  <span className="text-magenta-hot">$</span> {entry.command}
                </p>
                {entry.output && (
                  <pre className="mt-1.5 whitespace-pre-wrap break-words rounded border border-slate-border bg-slate-surface/60 px-3 py-2 text-[12px] text-slate-500">
                    {entry.output}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel px-6 py-5">
        <SectionTitle icon={ShieldAlert} label="Findings" />
        <div className="mt-3 space-y-3">
          {study.findings.map((finding) => (
            <div
              key={finding.title}
              className="flex flex-col gap-2 rounded-md border border-slate-border bg-white/[0.015] p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <h3 className="break-words font-mono text-sm font-semibold text-slate-100">
                  {finding.title}
                </h3>
                <p className="mt-1 break-words text-sm text-slate-400">{finding.detail}</p>
              </div>
              <span className={cn("badge-pill shrink-0", severityStyles[finding.severity])}>
                {severityLabel[finding.severity]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {study.iocs && study.iocs.length > 0 && (
        <section className="panel px-6 py-5">
          <SectionTitle icon={Fingerprint} label="Indicators of Compromise" />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-border font-mono text-[11px] uppercase tracking-widest text-slate-500">
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Value</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {study.iocs.map((ioc) => (
                  <tr key={ioc.value} className="border-b border-slate-border/60 align-top">
                    <td className="break-words py-2.5 pr-4 font-mono text-xs text-magenta-hot">{ioc.type}</td>
                    <td className="max-w-[220px] break-words py-2.5 pr-4 font-mono text-xs text-cyan-electric">{ioc.value}</td>
                    <td className="break-words py-2.5 text-slate-400">{ioc.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {study.riskMatrix && study.riskMatrix.length > 0 && (
        <section className="panel px-6 py-5">
          <SectionTitle icon={LayoutGrid} label="Risk Mitigation Matrix" />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-border font-mono text-[11px] uppercase tracking-widest text-slate-500">
                  <th className="py-2 pr-4">Asset</th>
                  <th className="py-2 pr-4">Threat</th>
                  <th className="py-2 pr-4">Likelihood</th>
                  <th className="py-2 pr-4">Impact</th>
                  <th className="py-2 pr-4">Risk</th>
                  <th className="py-2">Treatment</th>
                </tr>
              </thead>
              <tbody>
                {study.riskMatrix.map((row) => (
                  <tr key={row.asset} className="border-b border-slate-border/60 align-top">
                    <td className="break-words py-2.5 pr-4 font-mono text-xs text-slate-200">{row.asset}</td>
                    <td className="break-words py-2.5 pr-4 text-slate-400">{row.threat}</td>
                    <td className="break-words py-2.5 pr-4 text-slate-400">{row.likelihood}</td>
                    <td className="break-words py-2.5 pr-4 text-slate-400">{row.impact}</td>
                    <td className="py-2.5 pr-4">
                      <span className={cn("badge-pill", riskStyles[row.risk])}>{row.risk}</span>
                    </td>
                    <td className="break-words py-2.5 text-slate-400">{row.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="panel px-6 py-5">
        <SectionTitle icon={Wrench} label="Remediation" />
        <ul className="mt-3 space-y-2">
          {study.remediation.map((step) => (
            <li key={step} className="flex items-start gap-2.5 break-words text-sm text-slate-400">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-jade" />
              {step}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  label,
}: {
  icon: typeof Target;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-slate-200">
      <Icon className="h-4 w-4 text-cyan-electric" />
      {label}
    </div>
  );
}
