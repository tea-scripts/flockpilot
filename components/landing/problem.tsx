import { Reveal } from "@/components/motion";

export function Problem() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <Reveal className="rounded-[26px] border border-white/20 bg-brand-canvas p-8 shadow-panel sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">
          The Problem
        </p>
        <div className="mt-7 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Farm teams across Africa are forced to operate blind.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
              Manual records, delayed updates, and disconnected farm-finance tracking make it hard to detect mortality spikes, feed leakage, or poor batch and season margins before cash is already gone.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              FlockPilot connects operations and money in real time.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
              Owners and operators get one cockpit for flock and herd performance, feed efficiency, sales, and unit economics, with alerts and approvals that tighten execution across every farm site.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
