import { HERO_CONTENT } from "@/features/content/data/landing";
import { ButtonLink } from "@/shared/ui/button-link";
import { Container } from "@/shared/ui/container";
import { MediaPlaceholder } from "@/shared/ui/media-placeholder";

export function HeroSection() {
  return (
    <section id="inicio" className="border-b border-white/10 bg-ink">
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            {HERO_CONTENT.eyebrow}
          </p>

          <h1 className="mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {HERO_CONTENT.titleLead}{" "}
            <span className="text-brand">{HERO_CONTENT.titleEmphasis}</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {HERO_CONTENT.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={HERO_CONTENT.primaryCta.href}
              className="focus-visible:outline-white!"
            >
              {HERO_CONTENT.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={HERO_CONTENT.secondaryCta.href}
              variant="secondary"
              className="focus-visible:outline-white!"
            >
              {HERO_CONTENT.secondaryCta.label}
            </ButtonLink>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            {HERO_CONTENT.note}
          </p>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-brand"
          />
          <MediaPlaceholder
            tone="dark"
            label={HERO_CONTENT.media.label}
            detail={HERO_CONTENT.media.detail}
            className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[5/4]"
          />
        </div>
      </Container>
    </section>
  );
}
