import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { allTags, caseStudies } from "@/lib/case-studies";
import CaseStudyExplorer from "@/components/case-studies/CaseStudyExplorer";
import PageHeaderBadge from "@/components/shared/PageHeaderBadge";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Technical lab catalog covering penetration testing, Nmap network audits, PCAP triage, and risk assessments.",
};

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section>
        <PageHeaderBadge icon={FlaskConical} index="02" label="CASE_STUDIES // LAB CATALOG" />
        <h1 className="mt-3 font-mono text-3xl font-bold text-slate-50 sm:text-4xl">
          Technical Lab Catalog
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Documented engagements spanning penetration testing, network
          auditing, traffic analysis, and formal risk assessment. Each entry
          includes objectives, command logs, and remediation guidance.
        </p>
      </section>

      <CaseStudyExplorer studies={caseStudies} tags={allTags} />
    </div>
  );
}
