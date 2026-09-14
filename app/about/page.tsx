import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Boxes, Network, Server, ShieldAlert, User } from "lucide-react";
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
    title: "Enterprise Systems & Endpoint Engineering",
    period: "2003 — 2020",
    detail:
      "Graduated B.S. in IT (2003). Administered multi-site enterprise infrastructure for up to 3,200+ users, driving mass Dell KACE imaging pipelines (1,500+ endpoints), Active Directory GPO enforcement, and hands-on malware remediation.",
  },
  {
    icon: Network,
    title: "Network, IAM & Rapid Infrastructure Deployment",
    period: "2020 — 2023",
    detail:
      "Orchestrated mission-critical corporate continuity (Okta SSO, SonicWall VPNs). Administered 1,000+ user environments enforcing Duo 2FA, ThreatLocker, and Nutanix migrations.",
  },
  {
    icon: Boxes,
    title: "Security Range & Lab Engineering",
    period: "2023 — PRESENT",
    detail:
      "Architected isolated bare-metal KVM/QEMU virtualization ranges on VLAN 53. Deployed Active Directory GPO baselines and SMB/Kerberos hardening.",
  },
  {
    icon: ShieldAlert,
    title: "Offensive & Defensive Security Operations",
    period: "ONGOING",
    detail:
      "Conducting NIST CSF compliance audits, SIEM/packet triage (Wireshark), log analysis, and publishing interactive cyber playbooks.",
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
                <div className="absolute -left-9 top-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-electric/40 bg-obsidian-void text-cyan-electric">
                  <Icon className="h-3 w-3 shrink-0" />
                </div>
                <div className="panel px-5 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-1">
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
