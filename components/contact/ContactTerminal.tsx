"use client";

import { useState, type FormEvent } from "react";
import { AlertTriangle, Loader2, Send, ShieldCheck } from "lucide-react";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ContactTerminal() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.error || "Transmission failed. Try again or use a direct channel."
        );
      }

      setStatus("sent");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Transmission failed. Try again or use a direct channel."
      );
      setStatus("error");
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-border bg-obsidian-void">
      <div className="flex items-center gap-1.5 border-b border-slate-border bg-slate-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-magenta-hot/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-jade/70" />
        <span className="ml-2 font-mono text-[11px] text-slate-500">
          secure_message.sh — encrypted session
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 font-mono text-sm">
        {status === "sent" ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <ShieldCheck className="h-8 w-8 text-emerald-jade" />
            <p className="text-slate-200">Transmission received.</p>
            <p className="text-xs text-slate-500">
              Message queued for encrypted delivery. Expect a reply within 24-48h.
            </p>
          </div>
        ) : (
          <>
            {status === "error" && errorMessage && (
              <div className="flex items-start gap-2.5 rounded-md border border-magenta-hot/40 bg-magenta-hot/10 px-3.5 py-2.5 text-xs text-magenta-hot">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <Field label="operator_name">
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="jane_doe"
                maxLength={100}
                className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-700"
              />
            </Field>
            <Field label="return_address">
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@domain.com"
                maxLength={254}
                className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-700"
              />
            </Field>
            <Field label="payload_message">
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the engagement, timeline, or question..."
                maxLength={5000}
                className="w-full resize-none bg-transparent text-slate-100 outline-none placeholder:text-slate-700"
              />
            </Field>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-cyan-electric/40 bg-cyan-electric/10 px-5 py-2.5 text-cyan-electric shadow-glow-cyan transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Encrypting &amp; transmitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Transmit Message
                </>
              )}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-widest text-slate-600">
        <span className="text-magenta-hot">$</span> {label}::
      </span>
      <div className="rounded-md border border-slate-border bg-slate-surface/60 px-3 py-2.5 focus-within:border-cyan-electric/50">
        {children}
      </div>
    </label>
  );
}
