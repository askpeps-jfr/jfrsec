import type { Metadata } from "next";
import { Boxes, Cpu, ExternalLink, HardDrive, Lock, Network, Server } from "lucide-react";
import { hostArchitecture, vmEnvironments } from "@/lib/sandbox";
import VmEnvironmentCard from "@/components/sandbox/VmEnvironmentCard";
import PageHeaderBadge from "@/components/shared/PageHeaderBadge";

export const metadata: Metadata = {
  title: "The Sandbox",
  description:
    "Bare-metal virtualization range — Dell Latitude E7270 running KVM/QEMU, isolated on a quarantined VLAN, hosting Active Directory, macOS, and Kali Linux lab environments.",
};

export default function SandboxPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="panel relative overflow-hidden border-cyan-electric/20 px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-cyan-electric/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-magenta-hot/10 blur-[100px]" />

        <div className="relative z-10">
          <PageHeaderBadge
            icon={Boxes}
            index="03"
            label="THE_SANDBOX // LAB INFRASTRUCTURE"
            className="mb-5 w-fit"
          />
          <h1 className="font-mono text-3xl font-bold leading-tight tracking-tight text-slate-50 sm:text-5xl">
            THE SANDBOX{" "}
            <span className="text-cyan-electric text-glow-cyan">
              {"// Bare-Metal Virtualization Range"}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            A self-hosted, quarantined lab environment used to build and break
            enterprise infrastructure without touching a production network —
            every VM below runs on dedicated bare-metal hardware behind an
            isolated VLAN.
          </p>

          <a
            href={hostArchitecture.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-cyan-electric/40 bg-cyan-electric/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-electric shadow-glow-cyan transition-all hover:border-magenta-hot/40 hover:text-magenta-hot hover:shadow-glow-dual"
          >
            [ VIEW REPO
            <ExternalLink className="h-3.5 w-3.5" />]
          </a>
        </div>
      </section>

      <section className="panel px-6 py-6">
        <div className="mb-5 flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-slate-200">
          <HardDrive className="h-4 w-4 text-cyan-electric" />
          Architecture &amp; Hardware Spec
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SpecTile icon={Server} label="Host" value={hostArchitecture.host} />
          <SpecTile icon={Cpu} label="Hypervisor" value={hostArchitecture.hypervisor} />
          <SpecTile
            icon={Network}
            label="Network Quarantine"
            value={hostArchitecture.networkQuarantine}
          />
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-lg border border-magenta-hot/30 bg-magenta-hot/5 px-4 py-3.5">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-magenta-hot" />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-magenta-hot">
              Containment Policy
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {hostArchitecture.containmentPolicy}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="font-mono text-lg font-semibold tracking-wide text-slate-100">
            VIRTUAL_ENVIRONMENTS
          </h2>
          <span className="h-px flex-1 bg-slate-border" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-slate-600">
            {vmEnvironments.length} environments online
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vmEnvironments.map((environment, index) => (
            <VmEnvironmentCard key={environment.id} environment={environment} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SpecTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Server;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-border bg-white/[0.02] px-4 py-3.5">
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cyan-electric">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="text-sm leading-relaxed text-slate-300">{value}</p>
    </div>
  );
}
