import SecOpsHero from "@/components/home/SecOpsHero";
import MilestoneWire from "@/components/home/MilestoneWire";
import { caseStudies } from "@/lib/case-studies";
import { ArrowUpRight, Gauge, ShieldCheck, Target } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Labs Documented", value: caseStudies.length.toString().padStart(2, "0"), icon: Target },
  { label: "Critical Findings", value: caseStudies.filter((c) => c.severity === "critical").length.toString().padStart(2, "0"), icon: ShieldCheck },
  { label: "Avg. CVSS Scored", value: (caseStudies.reduce((a, c) => a + c.cvss, 0) / caseStudies.length).toFixed(1), icon: Gauge },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 overflow-x-hidden">
      <SecOpsHero />

      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="panel flex items-center gap-4 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-electric/30 bg-cyan-electric/5 text-cyan-electric">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xl font-semibold text-slate-100">{stat.value}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <MilestoneWire />

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-mono text-lg font-semibold tracking-wide text-slate-100">
            LATEST_ENTRIES
          </h2>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-cyan-electric hover:text-cyan-cyber"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {caseStudies.slice(0, 2).map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="panel group px-5 py-4 transition-colors hover:border-cyan-electric/40"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                {study.category}
              </p>
              <h3 className="mt-1.5 font-mono text-sm font-semibold text-slate-100 group-hover:text-cyan-electric">
                {study.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-400">{study.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
