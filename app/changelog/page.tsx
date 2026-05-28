import type { Metadata } from "next";
import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const metadata: Metadata = {
  title: "Changelog · FlockPilot",
  description:
    "See what's new in FlockPilot — latest updates, improvements, and fixes.",
  alternates: { canonical: "https://flockpilot.com/changelog" },
  openGraph: {
    title: "Changelog · FlockPilot",
    description:
      "Every improvement, fix, and new feature — documented.",
    url: "https://flockpilot.com/changelog",
  },
};

type EntryType = "added" | "improved" | "fixed" | "security" | "deprecated" | "removed";

interface ChangelogEntry {
  type: string;
  text: string;
}

interface ChangelogRelease {
  version: string;
  date: string;
  entries: ChangelogEntry[];
}

const badgeClasses: Record<EntryType, string> = {
  added:      "bg-green-500/15 text-green-400 border-green-500/30",
  improved:   "bg-blue-500/15 text-blue-400 border-blue-500/30",
  fixed:      "bg-amber-500/15 text-amber-400 border-amber-500/30",
  security:   "bg-red-500/15 text-red-400 border-red-500/30",
  deprecated: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  removed:    "bg-gray-500/15 text-gray-400 border-gray-500/30",
};

function getBadge(type: string) {
  const t = type as EntryType;
  const cls = badgeClasses[t] || badgeClasses.improved;
  const label = t.charAt(0).toUpperCase() + t.slice(1);
  return { cls, label };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getChangelog(): ChangelogRelease[] {
  const filePath = join(process.cwd(), "public", "changelog.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export default function ChangelogPage() {
  const releases = getChangelog();

  return (
    <main className="min-h-screen bg-brand-deep text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-light">
            FlockPilot
          </Link>
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="/features" className="hover:text-white">Features</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/ai-assistant" className="hover:text-white">AI Assistant</Link>
            <Link href="/changelog" className="text-brand-light">Changelog</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">
            Changelog
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            What&rsquo;s New in FlockPilot
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Every improvement, fix, and new feature &mdash; documented.
          </p>
        </div>
      </section>

      {/* Release list */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="flex flex-col gap-10">
          {releases.map((release) => (
            <article
              key={release.version}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-lg font-semibold text-white">
                  v{release.version}
                </span>
                <span className="text-sm text-white/50">
                  {formatDate(release.date)}
                </span>
              </div>
              <hr className="my-4 border-white/10" />
              <div className="flex flex-col gap-3">
                {release.entries.map((entry, i) => {
                  const { cls, label } = getBadge(entry.type);
                  return (
                    <div key={i} className="flex flex-col items-start gap-2">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cls}`}
                      >
                        {label}
                      </span>
                      <span className="text-sm leading-snug text-white/85">
                        {entry.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-white/50">
        <p>
          &copy; 2026 Enro Agro Limited. All rights reserved.{" "}
          <Link href="/" className="text-brand-light hover:text-brand-yellow">
            FlockPilot
          </Link>{" "}
          is a product of Enro Agro Limited.
        </p>
      </footer>
    </main>
  );
}
