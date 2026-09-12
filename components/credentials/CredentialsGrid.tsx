"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarClock,
  ExternalLink,
  GraduationCap,
  Hourglass,
  Layers,
} from "lucide-react";
import type { Credential } from "@/lib/credentials";
import { cn } from "@/lib/utils";
import DiplomaModal from "@/components/credentials/DiplomaModal";
import CredentialCarouselModal from "@/components/credentials/CredentialCarouselModal";

const statusStyles: Record<Credential["status"], string> = {
  VERIFIED: "border-emerald-jade/40 bg-emerald-jade/10 text-emerald-jade",
  "IN PROGRESS": "border-cyan-electric/40 bg-cyan-electric/10 text-cyan-electric",
  SCHEDULED: "border-slate-600/60 bg-white/[0.03] text-slate-400",
};

const statusIcon: Record<Credential["status"], typeof BadgeCheck> = {
  VERIFIED: BadgeCheck,
  "IN PROGRESS": Hourglass,
  SCHEDULED: CalendarClock,
};

export default function CredentialsGrid({
  credentials,
}: {
  credentials: Credential[];
}) {
  const [diplomaTarget, setDiplomaTarget] = useState<Credential | null>(null);
  const [carouselTarget, setCarouselTarget] = useState<Credential | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {credentials.map((credential, index) => {
        const StatusIcon = statusIcon[credential.status];
        const hasVerifyLink = credential.verifyUrl !== "#";
        const hasPreview = Boolean(credential.previewImage);
        const hasCourseCertificates = Boolean(credential.courseCertificates?.length);

        return (
          <motion.div
            key={credential.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="panel flex flex-col justify-between px-5 py-4"
          >
            <div>
              <div className="mb-2 flex items-start justify-between gap-3">
                <span className={cn("badge-pill", statusStyles[credential.status])}>
                  <StatusIcon className="h-3 w-3" />
                  {credential.status}
                </span>
                <span className="font-mono text-[11px] text-slate-600">
                  {credential.issueDate}
                </span>
              </div>

              <div className="flex items-start gap-2">
                {credential.type === "degree" && (
                  <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-electric" />
                )}
                <h3 className="font-mono text-sm font-semibold leading-snug text-slate-100">
                  {credential.title}
                </h3>
              </div>
              <p className="mt-1 text-xs text-slate-500">{credential.issuer}</p>
            </div>

            {hasCourseCertificates ? (
              <button
                onClick={() => setCarouselTarget(credential)}
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-electric transition-colors hover:text-magenta-hot"
              >
                <Layers className="h-3 w-3" />
                Verify Credential
                <ExternalLink className="h-3 w-3" />
              </button>
            ) : hasPreview ? (
              <button
                onClick={() => setDiplomaTarget(credential)}
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-electric transition-colors hover:text-magenta-hot"
              >
                [ VIEW VERIFIED {credential.type === "degree" ? "DIPLOMA" : "CERTIFICATE"}
                <ExternalLink className="h-3 w-3" />]
              </button>
            ) : hasVerifyLink ? (
              <a
                href={credential.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-electric hover:text-cyan-cyber"
              >
                Verify Badge
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-600">
                {credential.status === "SCHEDULED"
                  ? "Verification pending"
                  : "No public verification link"}
              </span>
            )}
          </motion.div>
        );
      })}

      <DiplomaModal
        open={diplomaTarget !== null}
        onClose={() => setDiplomaTarget(null)}
        title={diplomaTarget?.title ?? ""}
        imageSrc={diplomaTarget?.previewImage ?? ""}
      />

      <CredentialCarouselModal
        open={carouselTarget !== null}
        onClose={() => setCarouselTarget(null)}
        programTitle={carouselTarget?.title ?? ""}
        certificates={carouselTarget?.courseCertificates ?? []}
      />
    </div>
  );
}
