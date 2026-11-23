import type { SiteContent } from "@/features/content/types/landing";
import { ButtonLink } from "@/shared/ui/button-link";
import { Container } from "@/shared/ui/container";
import { MobileNav } from "./mobile-nav";
import { SiteWordmark } from "./site-wordmark";

interface SiteHeaderProps {
  site: SiteContent;
}

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a
          href={site.header.homeHref}
          aria-label={site.header.homeAriaLabel}
          className="inline-flex min-h-11 items-center rounded-sm"
        >
          <SiteWordmark content={site.wordmark} preload />
        </a>

        <nav
          aria-label={site.header.primaryNavLabel}
          className="hidden items-center gap-1 lg:flex"
        >
          {site.navigation.map((item) => (
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
          <ButtonLink href={site.header.cta.href}>
            {site.header.cta.label}
          </ButtonLink>
        </div>

        <MobileNav items={site.navigation} content={site.mobileNav} />
      </Container>
    </header>
  );
}
