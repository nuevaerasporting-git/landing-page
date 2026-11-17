const sponsors = [
  { name: "Agropecuaria M.T.", principal: true },
  { name: "Coop. Regional", principal: true },
  { name: "Transportes Sur", principal: true },
  { name: "Ferret. El Tren", principal: false },
  { name: "Farmacia Santa Fe", principal: false },
  { name: "Metalúrgica NESC", principal: false },
];

function initials(name: string): string {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function SponsorCard({
  name,
  principal,
  size,
}: {
  name: string;
  principal: boolean;
  size: "lg" | "sm";
}) {
  const lg = size === "lg";
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-lg bg-nesc-white transition-all hover:border-nesc-red active:scale-[0.98] ${
        principal
          ? "border-2 border-nesc-black/10 p-3 shadow-2xs sm:p-4"
          : "border border-nesc-border p-2.5 sm:p-3"
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-md bg-nesc-gray font-black uppercase tracking-wider text-nesc-black/40 ${
          lg ? "h-10 w-10 text-xs sm:h-12 sm:w-12 sm:text-sm" : "h-8 w-8 text-[10px] sm:h-9 sm:w-9 sm:text-[11px]"
        }`}
        aria-hidden
      >
        {initials(name)}
      </div>
      <span
        className={
          principal
            ? `text-center text-[11px] font-black uppercase tracking-wider ${
                name === "Coop. Regional" ? "text-nesc-red" : "text-nesc-black"
              }`
            : "text-center text-[10px] font-bold uppercase text-nesc-gray-mid hover:text-nesc-black"
        }
      >
        {name}
      </span>
    </div>
  );
}

export function SponsorsBlock() {
  const principals = sponsors.filter((s) => s.principal);
  const secondaries = sponsors.filter((s) => !s.principal);

  return (
    <section id="sponsors" className="border-b border-nesc-border bg-nesc-gray py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-2.5 rounded-xs bg-nesc-red" />
            <h2 className="text-sm font-black uppercase tracking-wide text-nesc-black sm:text-base">
              Empresas y Comercios que Acompañan al Tren Rojo
            </h2>
          </div>
          <a
            href="https://wa.me/5493462000000?text=Hola%20NESC!%20Me%20interesa%20sumar%20mi%20empresa%20como%20Sponsor%20del%20club."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center text-xs font-extrabold uppercase text-nesc-red hover:underline active:opacity-70"
          >
            Sumá tu marca como Sponsor →
          </a>
        </div>

        {/* Pirámide: principales arriba (estrecho), secundarios abajo (ancho) */}
        <div className="flex flex-col items-center gap-3">
          <div className="grid w-full max-w-2xl grid-cols-3 gap-3">
            {principals.map((s) => (
              <SponsorCard key={s.name} name={s.name} principal size="lg" />
            ))}
          </div>
          <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-3">
            {secondaries.map((s) => (
              <SponsorCard key={s.name} name={s.name} principal={false} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}