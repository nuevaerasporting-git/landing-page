import type { SponsorsContent } from "@/features/content/types/landing";
import { Section } from "@/shared/ui/section";

interface SponsorsSectionProps {
  content: SponsorsContent;
  slots: number[];
}

function SponsorSlot({ label }: { label: string }) {
  return (
    <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line bg-surface px-3 text-center">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-brand/40"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
    </div>
  );
}

export function SponsorsSection({ content, slots }: SponsorsSectionProps) {
  return (
    <Section
      id="patrocinadores"
      tone="surface"
      title={content.title}
      description={content.description}
    >
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <span aria-hidden="true" className="block h-1 w-full bg-brand" />
        <div className="relative py-4 sm:py-6">
          <p id="sponsors-carousel-help" className="sr-only">
            {content.carouselHelp}
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
            aria-label={content.regionLabel}
            aria-describedby="sponsors-carousel-help"
            tabIndex={0}
            className="sponsors-marquee hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand motion-safe:block"
          >
            <div className="sponsors-track flex w-max">
              <ul className="flex">
                {slots.map((slot) => (
                  <li
                    key={slot}
                    className="mr-4 w-36 shrink-0 sm:w-44 lg:w-52"
                  >
                    <SponsorSlot label={content.slotLabel} />
                  </li>
                ))}
              </ul>
              <ul className="flex" aria-hidden="true">
                {slots.map((slot) => (
                  <li
                    key={slot}
                    className="mr-4 w-36 shrink-0 sm:w-44 lg:w-52"
                  >
                    <SponsorSlot label={content.slotLabel} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 px-4 motion-safe:hidden sm:grid-cols-4 sm:gap-4 sm:px-6">
            {slots.map((slot) => (
              <li key={slot}>
                <SponsorSlot label={content.slotLabel} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        {content.note}
      </p>
    </Section>
  );
}
