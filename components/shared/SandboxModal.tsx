"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Fingerprint,
  MessagesSquare,
  Play,
  RotateCcw,
  Terminal,
  X,
} from "lucide-react";
import Modal from "@/components/shared/Modal";
import { cn } from "@/lib/utils";

export type SandboxCommand = {
  comment?: string;
  command: string;
  output?: string;
};

export type SandboxQA = { question: string; answer: string };

export type SandboxContext = {
  title: string;
  commands?: SandboxCommand[];
  sampleArtifact?: string;
  interviewQuestions?: SandboxQA[];
};

const DEFAULT_COMMANDS: SandboxCommand[] = [
  { comment: "Confirm operator session", command: "whoami", output: "jfr_sec" },
  { comment: "Check sandbox status", command: "sandbox --status", output: "[OK] simulated environment ready" },
];

const DEFAULT_ARTIFACT = `[2026-08-29 14:22:09] connection established 10.10.20.44 -> 185.220.101.7:443
User-Agent: Mozilla/4.0 (compatible; MSIE)
GET /checkin?id=8f14e45fceea167a5a36dedd4bea2543 HTTP/1.1
Referrer: https://portal.example.com/api/account/1029
SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;

function defaultQuestions(title: string): SandboxQA[] {
  return [
    {
      question: `Walk me through your process for ${title}.`,
      answer:
        "I start by defining scope and objectives, then move through discovery, analysis, and validation before documenting findings with clear remediation steps — the same structure used throughout this engagement.",
    },
    {
      question: "How do you prioritize findings when multiple issues surface at once?",
      answer:
        "I score each finding by likelihood x impact, then sequence remediation around what closes the largest exposure fastest, not just what's easiest to fix.",
    },
    {
      question: "What would you do differently on a real engagement of this type?",
      answer:
        "Add continuous monitoring after remediation to confirm the fix holds — a point-in-time report only proves the issue was fixed once.",
    },
    {
      question: "How do you communicate technical findings to a non-technical stakeholder?",
      answer:
        "I lead with business impact and risk, not technical jargon, then offer the technical detail as backup for anyone who wants it.",
    },
  ];
}

const TABS = [
  { id: "terminal", label: "LIVE_TERMINAL_REPLAY", icon: Terminal },
  { id: "ioc", label: "IOC_EXTRACTOR", icon: Fingerprint },
  { id: "interview", label: "AI_INTERVIEW_PREP", icon: MessagesSquare },
] as const;

type TabId = (typeof TABS)[number]["id"];

const IOC_PATTERNS: { type: string; regex: RegExp }[] = [
  { type: "IPv4", regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g },
  { type: "SHA256", regex: /\b[a-fA-F0-9]{64}\b/g },
  { type: "MD5", regex: /\b[a-fA-F0-9]{32}\b/g },
  { type: "URL", regex: /\bhttps?:\/\/[^\s]+/g },
  { type: "Domain", regex: /\b(?!https?:)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\b/g },
];

export default function SandboxModal({
  open,
  onClose,
  context,
}: {
  open: boolean;
  onClose: () => void;
  context: SandboxContext;
}) {
  const [tab, setTab] = useState<TabId>("terminal");

  const commands = context.commands?.length ? context.commands : DEFAULT_COMMANDS;
  const questions = context.interviewQuestions?.length
    ? context.interviewQuestions
    : defaultQuestions(context.title);

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="sandbox-modal-title"
      className="max-w-3xl"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Terminal className="h-4 w-4 text-cyan-electric" />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-electric">
              Simulated Environment
            </p>
            <h2 id="sandbox-modal-title" className="font-mono text-sm font-semibold text-slate-100">
              {context.title}
            </h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-slate-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-slate-400 transition-colors hover:border-magenta-hot/40 hover:text-magenta-hot"
        >
          <X className="h-3.5 w-3.5" />[ ESC / CLOSE ]
        </button>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-slate-border bg-obsidian-void/60 px-3 py-2">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                active
                  ? "border-cyan-electric/40 bg-cyan-electric/10 text-cyan-electric shadow-glow-cyan"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="px-5 py-5">
        {tab === "terminal" && <TerminalReplay commands={commands} />}
        {tab === "ioc" && (
          <IocExtractor sample={context.sampleArtifact ?? DEFAULT_ARTIFACT} />
        )}
        {tab === "interview" && <InterviewPrep questions={questions} />}
      </div>

      <div className="border-t border-slate-border px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
          Demo sandbox — no live systems are executed.
        </p>
      </div>
    </Modal>
  );
}

function TerminalReplay({ commands }: { commands: SandboxCommand[] }) {
  const [revealed, setRevealed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    if (revealed >= commands.length) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setRevealed((r) => r + 1), 700);
    return () => clearTimeout(id);
  }, [playing, revealed, commands.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [revealed]);

  const done = revealed >= commands.length;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={() => {
            if (done) setRevealed(0);
            setPlaying(true);
          }}
          disabled={playing}
          className="inline-flex items-center gap-1.5 rounded-md border border-cyan-electric/40 bg-cyan-electric/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-cyan-electric transition-colors hover:shadow-glow-dual disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-3 w-3" />
          {done ? "[ ▶ REPLAY ]" : "[ ▶ RUN REPLAY ]"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setRevealed(0);
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-slate-400 transition-colors hover:border-magenta-hot/40 hover:text-magenta-hot"
        >
          <RotateCcw className="h-3 w-3" />[ RESET ]
        </button>
      </div>

      <div
        ref={scrollRef}
        className="max-h-64 overflow-y-auto rounded-lg border border-slate-border bg-obsidian-void px-4 py-3 font-mono text-[12.5px] leading-relaxed"
      >
        {commands.slice(0, revealed).map((entry, i) => (
          <div key={i} className="mb-3 last:mb-0">
            {entry.comment && <p className="text-slate-600"># {entry.comment}</p>}
            <p className="text-cyan-electric">
              <span className="text-magenta-hot">$</span> {entry.command}
            </p>
            {entry.output && (
              <pre className="mt-1 whitespace-pre-wrap text-[12px] text-slate-500">
                {entry.output}
              </pre>
            )}
          </div>
        ))}
        {revealed === 0 && (
          <p className="text-slate-600">
            <span className="text-magenta-hot">$</span> awaiting replay
            <span className="ml-0.5 inline-block h-3 w-1.5 animate-blink bg-cyan-electric/70 align-middle" />
          </p>
        )}
        {!done && revealed > 0 && (
          <span className="inline-block h-3 w-1.5 animate-blink bg-cyan-electric/70 align-middle" />
        )}
      </div>
    </div>
  );
}

function IocExtractor({ sample }: { sample: string }) {
  const [text, setText] = useState(sample);
  const [results, setResults] = useState<{ type: string; values: string[] }[] | null>(null);

  function extract() {
    const grouped = IOC_PATTERNS.map(({ type, regex }) => {
      const matches = Array.from(new Set(text.match(regex) ?? []));
      return { type, values: matches };
    }).filter((g) => g.values.length > 0);
    setResults(grouped);
  }

  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
        Paste log / packet text, then extract indicators
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full resize-none rounded-lg border border-slate-border bg-obsidian-void px-3.5 py-2.5 font-mono text-[12px] text-slate-300 outline-none focus:border-cyan-electric/40"
      />
      <button
        onClick={extract}
        className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-cyan-electric/40 bg-cyan-electric/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-cyan-electric transition-colors hover:shadow-glow-dual"
      >
        <Play className="h-3 w-3" />[ ▶ EXTRACT IOCs ]
      </button>

      {results && (
        <div className="mt-4 space-y-3">
          {results.length === 0 ? (
            <p className="font-mono text-xs text-slate-600">No indicators matched.</p>
          ) : (
            results.map((group) => (
              <div key={group.type}>
                <p className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-magenta-hot">
                  {group.type}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.values.map((value) => (
                    <span
                      key={value}
                      className="badge-pill border-cyan-electric/30 bg-cyan-electric/5 font-mono text-cyan-electric"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function InterviewPrep({ questions }: { questions: SandboxQA[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {questions.map((qa, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={qa.question} className="overflow-hidden rounded-lg border border-slate-border">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 bg-white/[0.02] px-4 py-3 text-left"
            >
              <span className="font-mono text-sm text-slate-200">{qa.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-cyan-electric transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <p className="border-t border-slate-border bg-obsidian-void/60 px-4 py-3 text-sm leading-relaxed text-slate-400">
                {qa.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
