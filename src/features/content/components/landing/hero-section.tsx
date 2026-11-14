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
            María Teresa · Santa Fe
          </p>

          <h1 className="mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Mucho más que un club.{" "}
            <span className="text-brand">Un lugar para encontrarnos.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Deporte, comunidad y momentos compartidos en Nueva Era Sporting
            Club.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="#asociate"
              className="focus-visible:outline-white!"
            >
              Quiero asociarme
            </ButtonLink>
            <ButtonLink
              href="#actividades"
              variant="secondary"
              className="focus-visible:outline-white!"
            >
              Conocé las actividades
            </ButtonLink>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand"
            />
            Desde 1961, parte de la comunidad de María Teresa.
          </p>
        </div>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-brand"
          />
          <MediaPlaceholder
            tone="dark"
            label="Imagen del club pendiente"
            detail="Foto de deporte y comunidad"
            className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[5/4]"
          />
        </div>
      </Container>
    </section>
  );
}
