import { SITE_INFO } from "@/features/landing/data/site";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Icon } from "@/shared/ui/icons";
import { Placeholder } from "@/shared/ui/Placeholder";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-surface">
      <div className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden="true" />
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            <Icon name="star" className="size-4" />
            Desde el {SITE_INFO.foundationDate}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Más que un club,{" "}
            <span className="text-brand">nuestra segunda casa</span> en María
            Teresa.
          </h1>
          <p className="mt-4 text-lg font-semibold text-ink-soft">
            ¡Sumate al Tren Rojo!
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            Deporte, formación y vida social desde el {SITE_INFO.foundationDate}.
            Un espacio para encontrarse, crecer y compartir en comunidad.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={SITE_INFO.whatsappUrl} size="lg" variant="primary">
              Quiero asociarme
              <Icon name="arrow-right" className="size-4" />
            </ButtonLink>
            <ButtonLink href="#disciplinas" size="lg" variant="secondary">
              Conocé nuestras disciplinas
            </ButtonLink>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:max-w-md">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">
                Disciplinas
              </dt>
              <dd className="mt-1 text-2xl font-extrabold text-ink">6</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">
                Desde
              </dt>
              <dd className="mt-1 text-2xl font-extrabold text-ink">1961</dd>
            </div>
          </dl>
        </div>
        <Placeholder
          label="[Placeholder: Foto real del Polideportivo]"
          icon="users"
          aspect="portrait"
          className="w-full"
        />
      </Container>
    </section>
  );
}
