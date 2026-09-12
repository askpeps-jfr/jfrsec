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

export default function CredentialCard({
  credential,
  index = 0,
}: {
  credential: Credential;
  index?: number;
}) {
  const [diplomaOpen, setDiplomaOpen] = useState(false);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const StatusIcon = statusIcon[credential.status];
  const hasVerifyLink = credential.verifyUrl !== "#";
  const hasPreview = Boolean(credential.previewImage);
  const hasCourseCertificates = Boolean(credential.courseCertificates?.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="panel flex h-full flex-col justify-between px-5 py-5"
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className={cn("badge-pill", statusStyles[credential.status])}>
            <StatusIcon className="h-3 w-3" />
            {credential.status}
          </span>
          <span className="shrink-0 font-mono text-[11px] text-slate-600">
            {credential.issueDate}
          </span>
        </div>

        <div className="flex items-start gap-2.5">
          {credential.type === "degree" && (
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-cyan-electric" />
          )}
          <h3 className="font-mono text-base font-semibold leading-snug text-slate-100">
            {credential.title}
          </h3>
        </div>
        <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
          {credential.issuer}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {credential.description}
        </p>
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap gap-1.5">
          {credential.skillsCovered.map((skill) => (
            <span
              key={skill}
              className="badge-pill border-slate-border bg-white/[0.02] text-slate-400"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 border-t border-slate-border pt-3">
          {hasCourseCertificates ? (
            <button
              onClick={() => setCarouselOpen(true)}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-electric transition-colors hover:text-magenta-hot"
            >
              <Layers className="h-3 w-3" />
              Verify Credential
              <ExternalLink className="h-3 w-3" />
            </button>
          ) : hasPreview ? (
            <button
              onClick={() => setDiplomaOpen(true)}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-electric transition-colors hover:text-magenta-hot"
            >
              [ VIEW VERIFIED {credential.type === "degree" ? "DIPLOMA" : "CERTIFICATE"}
              <ExternalLink className="h-3 w-3" />]
            </button>
          ) : hasVerifyLink ? (
            <a
              href={credential.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-electric hover:text-cyan-cyber"
            >
              Verify Credential
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-600">
              {credential.status === "SCHEDULED"
                ? "Verification pending"
                : "No public verification link"}
            </span>
          )}
        </div>
      </div>

      {hasPreview && (
        <DiplomaModal
          open={diplomaOpen}
          onClose={() => setDiplomaOpen(false)}
          title={credential.title}
          imageSrc={credential.previewImage!}
        />
      )}

      {hasCourseCertificates && (
        <CredentialCarouselModal
          open={carouselOpen}
          onClose={() => setCarouselOpen(false)}
          programTitle={credential.title}
          certificates={credential.courseCertificates!}
        />
      )}
    </motion.div>
  );
}
