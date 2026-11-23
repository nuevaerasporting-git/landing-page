import type { HeroContent } from "@/features/content/types/landing";
import { ButtonLink } from "@/shared/ui/button-link";
import { Container } from "@/shared/ui/container";
import { MediaPlaceholder } from "@/shared/ui/media-placeholder";

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="inicio" className="border-b border-white/10 bg-ink">
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            {content.eyebrow}
          </p>

          <h1 className="mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {content.titleLead}{" "}
            <span className="text-brand">{content.titleEmphasis}</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {content.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={content.primaryCta.href}
              className="focus-visible:outline-white!"
            >
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={content.secondaryCta.href}
              variant="secondary"
              className="focus-visible:outline-white!"
            >
              {content.secondaryCta.label}
            </ButtonLink>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            {content.note}
          </p>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-brand"
          />
          <MediaPlaceholder
            tone="dark"
            label={content.media.label}
            detail={content.media.detail}
            className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[5/4]"
          />
        </div>
      </Container>
    </section>
  );
}
