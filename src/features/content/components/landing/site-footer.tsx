import { NAV_ITEMS } from "@/features/content/data/landing";
import { Container } from "@/shared/ui/container";
import { SiteWordmark } from "./site-wordmark";

export function SiteFooter() {
  return (
    <footer id="contacto" className="bg-ink text-white">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <SiteWordmark tone="dark" />
            <p className="mt-4 text-sm text-white/70">
              María Teresa, Santa Fe
            </p>
            <p className="mt-1 text-sm text-white/70">Argentina</p>
          </div>

          <nav aria-label="Enlaces del pie de página">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em]">
              Secciones
            </h2>
            <ul className="mt-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em]">
              Contacto
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Próximamente publicaremos los canales oficiales de contacto y
              redes sociales.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em]">
              Ubicación
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Polideportivo: Sáenz Peña y Sarmiento, María Teresa, Santa Fe.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <p className="text-xs leading-relaxed text-white/60">
            Nueva Era Sporting Club. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
