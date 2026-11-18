import { SITE_CONTENT } from "@/features/content/data/site";
import { ButtonLink } from "@/shared/ui/button-link";
import { Container } from "@/shared/ui/container";
import { MobileNav } from "./mobile-nav";
import { SiteWordmark } from "./site-wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a
          href={SITE_CONTENT.header.homeHref}
          aria-label={SITE_CONTENT.header.homeAriaLabel}
          className="inline-flex min-h-11 items-center rounded-sm"
        >
          <SiteWordmark preload />
        </a>

        <nav
          aria-label={SITE_CONTENT.header.primaryNavLabel}
          className="hidden items-center gap-1 lg:flex"
        >
          {SITE_CONTENT.navigation.map((item) => (
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
          <ButtonLink href={SITE_CONTENT.header.cta.href}>
            {SITE_CONTENT.header.cta.label}
          </ButtonLink>
        </div>

        <MobileNav items={SITE_CONTENT.navigation} />
      </Container>
    </header>
  );
}
