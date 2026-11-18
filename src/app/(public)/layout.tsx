import type { ReactNode } from "react";
import { SiteFooter } from "@/features/content/components/landing/site-footer";
import { SiteHeader } from "@/features/content/components/landing/site-header";
import { SITE_CONTENT } from "@/features/content/data/site";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        {SITE_CONTENT.accessibility.skipLinkLabel}
      </a>
      <SiteHeader />
      <main id="contenido" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
