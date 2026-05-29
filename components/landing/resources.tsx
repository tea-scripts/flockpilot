import { BookOpen, Newspaper, Youtube } from "lucide-react";
import { HoverLift, Reveal, Stagger, StaggerItem } from "@/components/motion";

const resources = [
  {
    Icon: Youtube,
    title: "Video tutorials",
    description:
      "Short, practical walkthroughs of every module — from your first batch to month-end financials."
  },
  {
    Icon: BookOpen,
    title: "Guides & docs",
    description:
      "A step-by-step knowledge base covering setup, day-to-day operations, and best practices."
  },
  {
    Icon: Newspaper,
    title: "Blog & playbooks",
    description:
      "Field-tested playbooks on running profitable farms across livestock and crops."
  }
];

export function Resources() {
  return (
    <section id="resources" className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <Reveal className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-light/40 bg-brand-canvas px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">
          Resources
          <span className="rounded-full bg-brand-yellow/20 px-2 py-0.5 text-[10px] tracking-normal text-brand-yellow">
            Coming soon
          </span>
        </span>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Learn FlockPilot, end to end</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
          A growing library of tutorials, guides, and playbooks to help your team get the most out of FlockPilot. Launching soon.
        </p>
      </Reveal>

      <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
        {resources.map(({ Icon, title, description }) => (
          <StaggerItem key={title} className="h-full">
            <HoverLift className="h-full">
              <div className="relative flex h-full flex-col rounded-2xl border border-white/12 bg-brand-canvas p-6">
                <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/55">
                  Soon
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light/15 text-brand-light">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{description}</p>
                <span className="mt-4 text-sm font-semibold text-white/40">Coming soon &rarr;</span>
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
