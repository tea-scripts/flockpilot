import Image from "next/image";

type FarmCustomer = {
  name: string;
  logo: string;
};

/**
 * Logos of farms using FlockPilot, shown with their permission. Add new
 * customers here as they come on board — drop the logo in /public/customers/
 * and append an entry.
 */
const farmCustomers: FarmCustomer[] = [
  { name: "Enro Agro Limited", logo: "/customers/enro-agro-limited.png" }
];

export function TrustedBy() {
  return (
    <section className="border-t border-white/10 bg-brand-deep px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Trusted by farms across Nigeria
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {farmCustomers.map((customer) => (
            <div
              key={customer.name}
              className="relative h-14 w-44 opacity-90 transition hover:opacity-100"
              title={customer.name}
            >
              <Image
                src={customer.logo}
                alt={customer.name}
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/50">
          More farms joining every month. Your farm could be next.
        </p>
      </div>
    </section>
  );
}
