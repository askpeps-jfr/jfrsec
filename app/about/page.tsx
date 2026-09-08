import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, GraduationCap, Server, User, Wrench } from "lucide-react";
import CredentialsGrid from "@/components/credentials/CredentialsGrid";
import { credentials } from "@/lib/credentials";
import PageHeaderBadge from "@/components/shared/PageHeaderBadge";

export const metadata: Metadata = {
  title: "About",
  description: "Professional journey and IT background of JFR Sec.",
};

const background = [
  {
    icon: Server,
    title: "IT Systems & Support",
    period: "2019 — 2023",
    detail:
      "Administered end-user systems, imaging pipelines, and internal ticketing for a 200+ seat organization, building the operational fluency that now informs threat modeling from a defender's perspective.",
  },
  {
    icon: Building2,
    title: "Network & Infrastructure",
    period: "2022 — 2024",
    detail:
      "Owned routing, switching, and firewall policy across multi-site VPN infrastructure, developing hands-on familiarity with the attack surface most audits are written about.",
  },
  {
    icon: GraduationCap,
    title: "Cybersecurity Specialization",
    period: "2024 — Present",
    detail:
      "Transitioned focus to offensive and defensive security — SOC triage, penetration testing methodology, and formal risk assessment frameworks.",
  },
  {
    icon: Wrench,
    title: "Independent Lab Practice",
    period: "Ongoing",
    detail:
      "Maintains a home lab for continuous practice: Nmap-driven recon, Wireshark packet triage, and Burp Suite-based web application testing.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-16">
      <section>
        <PageHeaderBadge icon={User} index="05" label="ABOUT // PROFILE" />
        <h1 className="mt-3 font-mono text-3xl font-bold text-slate-50 sm:text-4xl">
          Professional Journey
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Backed by a Bachelor of Science in Information Technology and over
          20 years of hands-on IT infrastructure experience, I have issued a
          formal directive to transition that foundation into cybersecurity
          operations — applying systems administration, network
          architecture, and hardware-level expertise to offensive and
          defensive security work. Every engagement documented in this
          console follows the same principle two decades in production
          environments taught me: understand how a system actually runs
          before you decide how it breaks.
        </p>
      </section>

      <section>
        <h2 className="mb-6 font-mono text-lg font-semibold tracking-wide text-slate-100">
          IT_BACKGROUND
        </h2>
        <div className="relative space-y-4 border-l border-slate-border pl-6">
          {background.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="relative">
                <div className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-electric/40 bg-obsidian-void text-cyan-electric">
                  <Icon className="h-3 w-3" />
                </div>
                <div className="panel px-5 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-mono text-sm font-semibold text-slate-100">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-slate-600">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="font-mono text-lg font-semibold tracking-wide text-slate-100">
            CREDENTIALS_&amp;_DIGITAL_BADGES
          </h2>
          <span className="h-px flex-1 bg-slate-border" />
          <Link
            href="/credentials"
            className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-cyan-electric hover:text-cyan-cyber"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <CredentialsGrid credentials={credentials.slice(0, 2)} />
      </section>
    </div>
  );
}
