import type { ReactNode } from "react";
import type { SiteContent } from "@/features/content/types/landing";
import { SITE_CONTENT } from "@/features/content/data/site";
import { getMappedSiteContent } from "@/features/content/services/site-content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

interface PublicChromeProps {
  site: SiteContent;
  children: ReactNode;
}

export function PublicChrome({ site, children }: PublicChromeProps) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        {site.accessibility.skipLinkLabel}
      </a>
      <SiteHeader site={site} />
      <main id="contenido" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter site={site} />
    </>
  );
}

export async function SiteChrome({ children }: { children: ReactNode }) {
  const content = await getMappedSiteContent();
  return <PublicChrome site={content?.site ?? SITE_CONTENT}>{children}</PublicChrome>;
}
