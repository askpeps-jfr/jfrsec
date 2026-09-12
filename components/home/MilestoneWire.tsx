"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Bot,
  Compass,
  Database,
  ExternalLink,
  Map,
  Network,
  ScanSearch,
  Siren,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SandboxLaunchButton from "@/components/shared/SandboxLaunchButton";
import type { SandboxCommand } from "@/components/shared/SandboxModal";
import { interviewQuestions } from "@/lib/interview-questions";

type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  sandboxCommands: SandboxCommand[];
  githubUrl: string;
};

const LAB_REPO = "https://github.com/askpeps-jfr/jfr-sec-lab";

const milestones: Milestone[] = [
  {
    id: "foundations",
    year: "STAGE_01",
    title: "Foundations & SecOps Directive",
    description:
      "20+ years of IT infrastructure experience formalized into a directed transition toward offensive and defensive cybersecurity operations.",
    icon: Compass,
    githubUrl: LAB_REPO,
    sandboxCommands: [
      { comment: "Confirm operator identity", command: "whoami", output: "jfr_sec" },
      {
        comment: "Check operational uptime",
        command: "uptime",
        output: "14:22:09 up 20 years, 3 users, load average: 0.42",
      },
    ],
  },
  {
    id: "vulneramap",
    year: "STAGE_02",
    title: "VulneraMap",
    description:
      "Botium Toys risk audit engine — asset inventory mapped to a dynamic, likelihood x impact risk matrix.",
    icon: Map,
    githubUrl: "https://github.com/askpeps-jfr/botium-toys-risk-audit",
    sandboxCommands: [
      {
        comment: "Run asset risk scoring",
        command: "python3 vulneramap.py --asset order_db --likelihood medium --impact high",
        output: "[RISK] order_db -> CRITICAL (score 8.7/10)",
      },
    ],
  },
  {
    id: "nethardener",
    year: "STAGE_03",
    title: "NetHardener",
    description:
      "Network defense toolkit covering firewall rule design, perimeter hardening, and OS-level lockdown.",
    icon: Network,
    githubUrl: "https://github.com/askpeps-jfr/nethardener-perimeter-matrix",
    sandboxCommands: [
      { comment: "Baseline exposed services", command: "nmap -sV -Pn 10.10.10.15", output: "22/tcp open ssh OpenSSH 7.2" },
      {
        comment: "Apply hardening baseline",
        command: "nethardener --apply firewall-baseline.yml",
        output: "[OK] 14 rules applied, 3 ports closed",
      },
    ],
  },
  {
    id: "logquery",
    year: "STAGE_04",
    title: "LogQuery Forensic Sandbox",
    description:
      "Linux authentication log triage paired with a custom SQL query engine for fast forensic pivoting.",
    icon: Database,
    githubUrl: "https://github.com/askpeps-jfr/logquery-forensic-sandbox",
    sandboxCommands: [
      {
        comment: "Triage failed logins",
        command: "logquery --source /var/log/auth.log --grep 'Failed password'",
        output: "47 failed logins from 3 unique IPs in the last 24h",
      },
      {
        comment: "Pivot with SQL query engine",
        command: "SELECT ip, COUNT(*) FROM auth_events GROUP BY ip ORDER BY 2 DESC;",
        output: "185.220.101.7 | 41",
      },
    ],
  },
  {
    id: "threatsurface",
    year: "STAGE_05",
    title: "ThreatSurface Engine",
    description:
      "CVE vulnerability scanning combined with physical and USB attack-surface auditing.",
    icon: ScanSearch,
    githubUrl: LAB_REPO,
    sandboxCommands: [
      {
        comment: "Scan for known CVEs",
        command: "threatsurface scan --cve-db nvd --target 10.10.10.0/24",
        output: "[!] 3 hosts vulnerable to CVE-2018-15473",
      },
      {
        comment: "Audit physical USB surface",
        command: "threatsurface usb-audit --host WKSTN-04",
        output: "[WARN] unauthorized USB mass-storage event detected",
      },
    ],
  },
  {
    id: "siem-triage",
    year: "STAGE_06",
    title: "SIEM Triage Chamber",
    description:
      "Detection signature tuning and incident response playbooks built around live SIEM alert triage.",
    icon: Siren,
    githubUrl: LAB_REPO,
    sandboxCommands: [
      {
        comment: "Explain alert classification",
        command: "siem-triage --alert 4471 --explain",
        output: "Beacon pattern matches signature SIG-C2-0091 (confidence 92%)",
      },
      {
        comment: "Inspect conversation timing",
        command: "tshark -r capture.pcap -q -z conv,tcp",
        output: "10.10.20.44:49213 <-> 185.220.101.7:443  41 pkts",
      },
    ],
  },
  {
    id: "sentinel-py",
    year: "STAGE_07",
    title: "Sentinel-Py & AI Ops",
    description:
      "Python automation driving AI-assisted SOC workflows — the current frontier of this security practice.",
    icon: Bot,
    githubUrl: LAB_REPO,
    sandboxCommands: [
      {
        comment: "Run AI-assisted alert triage",
        command: "python3 sentinel.py --mode triage --input alert_queue.json",
        output: "[AI] 12 alerts auto-closed as benign, 2 escalated for review",
      },
    ],
  },
];

export default function MilestoneWire() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 60%"],
  });
  const wireProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.5,
  });

  return (
    <section ref={containerRef} className="relative py-6">
      <div className="mb-10 flex items-center gap-3">
        <h2 className="font-mono text-lg font-semibold tracking-wide text-slate-100">
          MILESTONE_WIRE
        </h2>
        <span className="h-px flex-1 bg-slate-border" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-600">
          7 stages logged
        </span>
      </div>

      <div className="relative pl-14 sm:pl-16">
        {/* Layer 1: dim resting-state trace */}
        <div
          className="absolute left-5 top-1 h-[calc(100%-1rem)] w-[2px] rounded-full bg-cyan-950/40 sm:left-6"
          aria-hidden
        />
        {/* Layer 2: active neon trace — fills downward as the wire's scroll
            progress advances, driving each node into [ACTIVE_NODE] in step. */}
        <motion.div
          style={{ scaleY: wireProgress, originY: 0 }}
          className="absolute left-5 top-1 h-[calc(100%-1rem)] w-[2px] rounded-full bg-gradient-to-b from-cyan-400 via-emerald-400 to-cyan-300 shadow-[0_0_12px_#00e5ff,0_0_24px_rgba(0,229,255,0.4)] sm:left-6"
          aria-hidden
        />

        <ul className="space-y-10">
          {milestones.map((milestone, index) => (
            <MilestoneNode
              key={milestone.title}
              milestone={milestone}
              index={index}
              total={milestones.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function MilestoneNode({
  milestone,
  index,
  total,
  scrollYProgress,
}: {
  milestone: Milestone;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const threshold = index / total;
  const nextThreshold = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(threshold - 0.06, 0), threshold + 0.04],
    [0.3, 1]
  );
  const glow = useTransform(
    scrollYProgress,
    [Math.max(threshold - 0.06, 0), threshold + 0.04],
    [0, 1]
  );
  const Icon = milestone.icon;
  const isFinal = index === total - 1;
  const nodeGlow = useTransform(
    glow,
    [0, 1],
    [
      "0 0 0 rgba(0,245,212,0)",
      isFinal
        ? "0 0 20px rgba(255,0,127,0.5)"
        : "0 0 16px rgba(0,245,212,0.45)",
    ]
  );

  const [isActiveNode, setIsActiveNode] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const lowerBound = threshold - 0.02;
    // The final node has no next node to hand off to — once the wire reaches
    // it, it stays active through scrollYProgress === 1 (end of scroll)
    // instead of being cut off by an upper bound it may never fully clear.
    const isPastLowerBound = latest >= lowerBound;
    const isBeforeUpperBound = isFinal || latest < nextThreshold - 0.02;
    setIsActiveNode(isPastLowerBound && isBeforeUpperBound);
  });

  return (
    <motion.li style={{ opacity }} className="relative">
      <motion.div
        style={isActiveNode ? undefined : { boxShadow: nodeGlow }}
        className={cn(
          "absolute -left-14 top-0 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 sm:-left-16",
          isActiveNode
            ? "border-cyan-400 bg-cyan-950/80 text-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.6)] ring-2 ring-cyan-400"
            : isFinal
              ? "border-magenta-hot/50 bg-magenta-hot/10 text-magenta-hot"
              : "border-cyan-electric/50 bg-cyan-electric/10 text-cyan-electric"
        )}
      >
        <Icon
          className={cn(
            "h-7 w-7 drop-shadow-glow-cyan",
            isFinal && !isActiveNode && "drop-shadow-glow-magenta"
          )}
        />
      </motion.div>

      <div className="panel px-5 py-4">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-600">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                isActiveNode ? "bg-cyan-400" : isFinal ? "bg-magenta-hot" : "bg-cyan-electric"
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-1.5 w-1.5 rounded-full",
                isActiveNode ? "bg-cyan-400" : isFinal ? "bg-magenta-hot" : "bg-cyan-electric"
              )}
            />
          </span>
          {isActiveNode ? (
            <span className="text-cyan-400">[ ACTIVE_NODE ]</span>
          ) : (
            <>
              <span className={cn(isFinal ? "text-magenta-hot" : "text-cyan-electric")}>
                {milestone.year}
              </span>
              <span className="text-slate-700">{"//"}</span>
              <span>
                {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
              </span>
            </>
          )}
        </div>
        <h3 className="font-mono text-base font-semibold text-slate-100">
          {milestone.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
          {milestone.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <SandboxLaunchButton
            context={{
              title: milestone.title,
              commands: milestone.sandboxCommands,
              interviewQuestions: interviewQuestions[milestone.id]?.map(({ q, a }) => ({
                question: q,
                answer: a,
              })),
            }}
          />
          <a
            href={milestone.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-border bg-white/[0.02] px-4 py-2 font-mono text-xs uppercase tracking-widest text-slate-300 transition-all hover:border-magenta-hot/40 hover:text-magenta-hot hover:shadow-glow-dual"
          >
            [ VIEW REPO
            <ExternalLink className="h-3.5 w-3.5" />]
          </a>
        </div>
      </div>
    </motion.li>
  );
}
