import type { Metadata } from "next";
import { Download, Github, Key, Linkedin, Mail } from "lucide-react";
import ContactTerminal from "@/components/contact/ContactTerminal";
import PageHeaderBadge from "@/components/shared/PageHeaderBadge";

export const metadata: Metadata = {
  title: "Contact",
  description: "Secure contact channels and PGP key for JFR Sec.",
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@jfrsec.com",
    href: "mailto:contact@jfrsec.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/jfrsec",
    href: "https://github.com/",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/jfrsec",
    href: "https://linkedin.com/",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10">
      <section>
        <PageHeaderBadge icon={Mail} index="06" label="CONTACT // SECURE CHANNEL" />
        <h1 className="mt-3 font-mono text-3xl font-bold text-slate-50 sm:text-4xl">
          Establish Contact
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          For engagement inquiries, collaboration, or sensitive disclosures,
          reach out through the channels below or transmit a message directly.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
        <ContactTerminal />

        <div className="flex flex-col gap-6">
          <div className="panel px-5 py-5">
            <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-slate-200">
              Direct Channels
            </h2>
            <ul className="space-y-3">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-md border border-slate-border bg-white/[0.02] px-3.5 py-2.5 text-sm transition-colors hover:border-cyan-electric/40"
                    >
                      <Icon className="h-4 w-4 text-cyan-electric" />
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-600">
                          {channel.label}
                        </p>
                        <p className="truncate text-slate-300 group-hover:text-cyan-electric">
                          {channel.value}
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="panel px-5 py-5">
            <h2 className="mb-3 flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-slate-200">
              <Key className="h-4 w-4 text-magenta-hot" />
              PGP Public Key
            </h2>
            <p className="mb-4 text-xs leading-relaxed text-slate-500">
              For sensitive disclosures, encrypt your message using the public
              key below before transmitting.
            </p>
            <div className="mb-4 overflow-x-auto rounded-md border border-slate-border bg-obsidian-void px-3.5 py-3 font-mono text-[11px] text-slate-500">
              <p>Fingerprint::</p>
              <p className="text-cyan-electric">
                4A2B 91C0 7DE3 5F18 2A6C 90B4 E7F1 33D8 21AC 5B9E
              </p>
            </div>
            <a
              href="/keys/pgp-public-key.asc"
              download
              className="inline-flex items-center gap-2 rounded-md border border-magenta-hot/40 bg-magenta-hot/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-magenta-hot shadow-glow-magenta transition-transform hover:scale-[1.02]"
            >
              <Download className="h-3.5 w-3.5" />
              Download key.asc
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
