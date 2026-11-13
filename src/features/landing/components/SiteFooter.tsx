import { NAV_ITEMS, SITE_INFO, SOCIAL_LINKS } from "@/features/landing/data/site";
import { Container } from "@/shared/ui/Container";
import { Icon } from "@/shared/ui/icons";
import { NescShield } from "@/shared/ui/NescShield";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a
              href="#inicio"
              className="inline-flex items-center gap-3"
              aria-label={`${SITE_INFO.name}, ir al inicio`}
            >
              <NescShield
                className="h-12 w-10"
                title="Escudo de Nueva Era Sporting Club"
              />
              <span>
                <span className="block text-sm font-extrabold uppercase tracking-wide">
                  Nueva Era
                </span>
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-white">
                  Sporting Club
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              Asociación Civil sin fines de lucro de María Teresa, Santa Fe.
              Deporte, formación y vida social desde 1961.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Navegación
            </h2>
            <nav aria-label="Navegación del pie" className="mt-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center text-sm font-semibold text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Contacto
            </h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  <span className="block font-bold">
                    {SITE_INFO.polideportivo.name}
                  </span>
                  <span className="mt-1 block text-white/70">
                    {SITE_INFO.polideportivo.address}
                  </span>
                  <span className="block text-white/70">
                    {SITE_INFO.polideportivo.detail}
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  <span className="block font-bold">{SITE_INFO.sedeSocial.name}</span>
                  <span className="mt-1 block text-white/70">
                    {SITE_INFO.sedeSocial.address}
                  </span>
                  <span className="block text-white/70">
                    {SITE_INFO.sedeSocial.detail}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex size-11 items-center justify-center rounded-md border border-white/15 text-white/75 transition-colors hover:border-brand hover:text-white"
              >
                <Icon name={social.icon} className="size-5" />
              </a>
            ))}
          </div>
          <p className="text-xs text-white/50">
            © {SITE_INFO.name}. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
