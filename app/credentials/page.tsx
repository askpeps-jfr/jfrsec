import type { Metadata } from "next";
import { Award } from "lucide-react";
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
    </div>
  );
}
