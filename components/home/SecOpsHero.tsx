"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Download, Mail, Terminal } from "lucide-react";
import PageHeaderBadge from "@/components/shared/PageHeaderBadge";

export default function SecOpsHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      ref={heroRef}
      className="relative mx-auto w-full max-w-full overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#060b11] shadow-[0_0_30px_rgba(6,182,212,0.1)] md:min-h-[520px]"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <Image
          src="/hero-bg.avif"
          alt="NOC server room backdrop"
          fill
          priority
          className="object-cover object-center opacity-20 filter-none md:opacity-100"
        />
      </motion.div>

      {/* Mobile: faded watermark — the shield artwork sits at opacity-20 behind
          the text with a bottom-anchored fade so headline/CTAs read with zero
          competing layers. */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#060b11] via-[#060b11]/80 to-transparent md:hidden" />

      {/* Desktop: directional reading scrim — keeps the text column legible
          without dimming the emblem/circuitry on the right half of the artwork. */}
      <div className="absolute inset-0 z-[1] hidden bg-gradient-to-r from-[#03070b]/95 via-[#03070b]/75 to-transparent pointer-events-none md:block md:w-[65%]" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 px-6 py-6 sm:px-8 sm:py-10 md:grid-cols-12 md:px-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start text-left md:col-span-7"
        >
          <PageHeaderBadge
            icon={Terminal}
            index="01"
            label="SECOPS_INITIALIZED"
            className="mb-4 w-fit sm:mb-6"
          />

          <h1 className="font-mono text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl lg:text-6xl">
            Securing systems,{" "}
            <span className="text-cyan-electric text-glow-cyan">one exploit</span>{" "}
            at a time.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:mt-5 sm:text-base">
            I&apos;m JFR — a cybersecurity analyst focused on offensive security,
            network defense, and risk assessment. This console documents the
            labs, audits, and investigations behind that work.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link
              href="/case-studies"
              className="group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-cyan-electric/40 bg-cyan-electric/10 px-4 py-2.5 font-mono text-xs text-cyan-electric shadow-glow-cyan transition-all hover:scale-[1.02] hover:border-magenta-hot/40 hover:shadow-glow-dual"
            >
              View Case Studies
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-slate-border bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-slate-300 transition-all hover:border-magenta-hot/40 hover:text-magenta-hot hover:shadow-glow-dual"
            >
              <Mail className="h-4 w-4 shrink-0" />
              Establish Contact
            </Link>
            <a
              href="/docs/jose-romero-cybersecurity-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Jose_Romero_Cybersecurity_Resume.pdf"
              className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-cyan-electric/40 bg-cyan-electric/5 px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-cyan-electric transition-all hover:scale-[1.02] hover:border-magenta-hot/40 hover:shadow-glow-dual"
            >
              <Download className="h-4 w-4 shrink-0" />[ EXPORT_DOSSIER.PDF ↓ ]
            </a>
          </div>
        </motion.div>

        {/* Column 2: empty spacer at md+ so the backdrop artwork shows through
            on the right; not rendered as a separate card on mobile anymore —
            the watermarked background above carries the emblem there instead. */}
        <div className="hidden md:col-span-5 md:block" aria-hidden />
      </div>
    </section>
  );
}
