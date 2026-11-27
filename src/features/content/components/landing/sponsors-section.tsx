import Image from "next/image";
import { SPONSOR_PLACEHOLDERS } from "@/features/content/data/landing";
import type { SponsorsContent } from "@/features/content/types/landing";
import type { Sponsor } from "@/features/sponsors/types/sponsor";
import { Section } from "@/shared/ui/section";

interface SponsorsSectionProps {
  content: SponsorsContent;
  sponsors: Sponsor[];
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

interface SponsorCardProps {
  sponsor: Sponsor;
  decorative?: boolean;
}

function SponsorCard({ sponsor, decorative = false }: SponsorCardProps) {
  const logo = (
    <Image
      src={sponsor.logoUrl}
      alt={decorative ? "" : sponsor.logoAlt}
      width={160}
      height={64}
      className="max-h-12 w-auto object-contain"
    />
  );

  const cardClass =
    "flex h-24 w-full items-center justify-center rounded-md border border-line bg-white px-3";

  if (sponsor.websiteUrl) {
    return (
      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={decorative ? -1 : undefined}
        aria-label={decorative ? undefined : `Visitar el sitio de ${sponsor.name}`}
        className={`${cardClass} transition-colors hover:border-brand`}
      >
        {logo}
      </a>
    );
  }

  return <div className={cardClass}>{logo}</div>;
}

export function SponsorsSection({ content, sponsors }: SponsorsSectionProps) {
  const hasSponsors = sponsors.length > 0;
  const slots = hasSponsors ? [] : [...SPONSOR_PLACEHOLDERS];

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
            aria-label={hasSponsors ? "Patrocinadores" : content.regionLabel}
            aria-describedby="sponsors-carousel-help"
            tabIndex={0}
            className="sponsors-marquee hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand motion-safe:block"
          >
            <div className="sponsors-track flex w-max">
              <ul className="flex">
                {hasSponsors
                  ? sponsors.map((sponsor) => (
                      <li
                        key={sponsor.id}
                        className="mr-4 w-36 shrink-0 sm:w-44 lg:w-52"
                      >
                        <SponsorCard sponsor={sponsor} />
                      </li>
                    ))
                  : slots.map((slot) => (
                      <li
                        key={slot}
                        className="mr-4 w-36 shrink-0 sm:w-44 lg:w-52"
                      >
                        <SponsorSlot label={content.slotLabel} />
                      </li>
                    ))}
              </ul>
              <ul className="flex" aria-hidden="true">
                {hasSponsors
                  ? sponsors.map((sponsor) => (
                      <li
                        key={`copy-${sponsor.id}`}
                        className="mr-4 w-36 shrink-0 sm:w-44 lg:w-52"
                      >
                        <SponsorCard sponsor={sponsor} decorative />
                      </li>
                    ))
                  : slots.map((slot) => (
                      <li
                        key={`copy-${slot}`}
                        className="mr-4 w-36 shrink-0 sm:w-44 lg:w-52"
                      >
                        <SponsorSlot label={content.slotLabel} />
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 px-4 motion-safe:hidden sm:grid-cols-4 sm:gap-4 sm:px-6">
            {hasSponsors
              ? sponsors.map((sponsor) => (
                  <li key={sponsor.id}>
                    <SponsorCard sponsor={sponsor} />
                  </li>
                ))
              : slots.map((slot) => (
                  <li key={slot}>
                    <SponsorSlot label={content.slotLabel} />
                  </li>
                ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">{content.note}</p>
    </Section>
  );
}
