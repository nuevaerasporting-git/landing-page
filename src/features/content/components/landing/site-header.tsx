import { NAV_ITEMS } from "@/features/content/data/landing";
import { ButtonLink } from "@/shared/ui/button-link";
import { Container } from "@/shared/ui/container";
import { MobileNav } from "./mobile-nav";
import { SiteWordmark } from "./site-wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a
          href="#inicio"
          aria-label="Nueva Era Sporting Club — ir al inicio"
          className="inline-flex min-h-11 items-center rounded-sm"
        >
          <SiteWordmark preload />
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold text-ink transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="#asociate">Quiero asociarme</ButtonLink>
        </div>

        <MobileNav items={NAV_ITEMS} />
      </Container>
    </header>
  );
}
