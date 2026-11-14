import { SPONSOR_PLACEHOLDERS } from "@/features/content/data/landing";
import { Section } from "@/shared/ui/section";

function SponsorSlot() {
  return (
    <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line bg-surface px-3 text-center">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-brand/40"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        Logo pendiente
      </span>
    </div>
  );
}

export function SponsorsSection() {
  return (
    <Section
      id="patrocinadores"
      tone="surface"
      title="Quienes nos acompañan"
      description="Este espacio está reservado para las marcas que acompañan al club."
    >
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <span aria-hidden="true" className="block h-1 w-full bg-brand" />
        <div className="relative py-4 sm:py-6">
          <p id="sponsors-carousel-help" className="sr-only">
            Carrusel automático de patrocinadores. Se pausa al pasar el cursor,
            al enfocar o al interactuar.
          </p>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-8 bg-linear-to-r from-white to-transparent motion-safe:block sm:w-12"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-8 bg-linear-to-l from-white to-transparent motion-safe:block sm:w-12"
          />

          <div
            role="region"
            aria-label="Patrocinadores pendientes"
            aria-describedby="sponsors-carousel-help"
            tabIndex={0}
            className="sponsors-marquee hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand motion-safe:block"
          >
            <div className="sponsors-track flex w-max">
              <ul className="flex">
                {SPONSOR_PLACEHOLDERS.map((slot) => (
                  <li
                    key={slot}
                    className="mr-4 w-36 shrink-0 sm:w-44 lg:w-52"
                  >
                    <SponsorSlot />
                  </li>
                ))}
              </ul>
              <ul className="flex" aria-hidden="true">
                {SPONSOR_PLACEHOLDERS.map((slot) => (
                  <li
                    key={slot}
                    className="mr-4 w-36 shrink-0 sm:w-44 lg:w-52"
                  >
                    <SponsorSlot />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 px-4 motion-safe:hidden sm:grid-cols-4 sm:gap-4 sm:px-6">
            {SPONSOR_PLACEHOLDERS.map((slot) => (
              <li key={slot}>
                <SponsorSlot />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        Los logotipos se publican únicamente con autorización de cada marca.
      </p>
    </Section>
  );
}
