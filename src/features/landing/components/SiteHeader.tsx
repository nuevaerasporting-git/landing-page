import { NAV_ITEMS, SITE_INFO } from "@/features/landing/data/site";
import { ButtonLink } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Icon } from "@/shared/ui/icons";
import { NescShield } from "@/shared/ui/NescShield";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4">
          <a
            href="#inicio"
            className="flex min-w-0 items-center gap-3"
            aria-label={`${SITE_INFO.name}, ir al inicio`}
          >
            <NescShield
              className="h-11 w-9 shrink-0"
              title="Escudo de Nueva Era Sporting Club"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold uppercase tracking-wide text-ink">
                Nueva Era
              </span>
              <span className="block truncate text-[11px] font-semibold uppercase tracking-widest text-brand">
                Sporting Club
              </span>
            </span>
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-6 md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-ink-soft transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href={SITE_INFO.whatsappUrl} variant="primary" size="md">
              <Icon name="whatsapp" className="size-4" />
              WhatsApp
            </ButtonLink>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
