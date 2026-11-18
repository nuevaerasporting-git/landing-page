import { SITE_CONTENT } from "@/features/content/data/site";
import { Container } from "@/shared/ui/container";
import { SiteWordmark } from "./site-wordmark";

export function SiteFooter() {
  const { footer } = SITE_CONTENT;

  return (
    <footer id="contacto" className="bg-ink text-white">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <SiteWordmark tone="dark" />
            <p className="mt-4 text-sm text-white/70">
              {footer.locationPrimary}
            </p>
            <p className="mt-1 text-sm text-white/70">
              {footer.locationSecondary}
            </p>
          </div>

          <nav aria-label={footer.navLabel}>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em]">
              {footer.sectionsLabel}
            </h2>
            <ul className="mt-4">
              {SITE_CONTENT.navigation.map((item) => (
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
              {footer.contactLabel}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {footer.contactDescription}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em]">
              {footer.locationLabel}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {footer.locationDescription}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <p className="text-xs leading-relaxed text-white/60">
            {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
