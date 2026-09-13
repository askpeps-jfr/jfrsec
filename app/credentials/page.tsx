import type { Metadata } from "next";
import { Award, Download } from "lucide-react";
import { credentials } from "@/lib/credentials";
import CredentialCard from "@/components/credentials/CredentialCard";
import PageHeaderBadge from "@/components/shared/PageHeaderBadge";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Degrees, verified credentials, and in-progress certifications for JFR Sec — ITT Tech, Google Cybersecurity, Google IT Support, and CompTIA.",
};

export default function CredentialsPage() {
  const verifiedCount = credentials.filter((c) => c.status === "VERIFIED").length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section>
        <PageHeaderBadge icon={Award} index="04" label="CREDENTIALS // REGISTRY" />
        <h1 className="mt-3 font-mono text-3xl font-bold text-slate-50 sm:text-4xl">
          Credentials &amp; Digital Badges
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {verifiedCount} of {credentials.length} credentials verified,
          spanning formal education and industry certifications. Each entry
          links to its public verification badge where available.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((credential, index) => (
          <CredentialCard key={credential.id} credential={credential} index={index} />
        ))}
      </div>

      <section className="panel flex flex-col items-center gap-4 border-cyan-electric/20 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-electric">
            Full Export
          </p>
          <h2 className="mt-1 font-mono text-lg font-semibold text-slate-100">
            Complete Technical Dossier
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-slate-400">
            A single PDF covering the full credential record, technical
            skillset, and engagement history behind this console.
          </p>
        </div>
        <a
          href="/docs/jose-romero-cybersecurity-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Jose_Romero_Cybersecurity_Resume.pdf"
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-cyan-electric/40 bg-cyan-electric/10 px-5 py-2.5 font-mono text-sm uppercase tracking-wide text-cyan-electric shadow-glow-cyan transition-all hover:scale-[1.02] hover:border-magenta-hot/40 hover:shadow-glow-dual"
        >
          <Download className="h-4 w-4 shrink-0" />[ EXPORT_DOSSIER.PDF ↓ ]
        </a>
      </section>
    </div>
  );
}
