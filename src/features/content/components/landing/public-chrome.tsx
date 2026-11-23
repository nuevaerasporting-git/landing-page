import { SITE_CONTENT } from "@/features/content/data/site";
import { getMappedSiteContent } from "@/features/content/services/site-content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteSkipLink() {
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
    >
      {SITE_CONTENT.accessibility.skipLinkLabel}
    </a>
  );
}

export function SiteHeaderPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="h-16 border-b border-line bg-white lg:h-20"
    />
  );
}

export function SiteFooterPlaceholder() {
  return <div aria-hidden="true" className="min-h-80 bg-ink" />;
}

export async function AsyncSiteHeader() {
  const content = await getMappedSiteContent();
  return <SiteHeader site={content?.site ?? SITE_CONTENT} />;
}

export async function AsyncSiteFooter() {
  const content = await getMappedSiteContent();
  return <SiteFooter site={content?.site ?? SITE_CONTENT} />;
}
