import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense, type ReactNode } from "react";
import {
  AsyncSiteFooter,
  AsyncSiteHeader,
  SiteFooterPlaceholder,
  SiteHeaderPlaceholder,
  SiteSkipLink,
} from "@/features/content/components/landing/public-chrome";
import { SITE_CONTENT } from "@/features/content/data/site";
import { getMappedSiteContent } from "@/features/content/services/site-content";

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const content = await getMappedSiteContent();
  const metadata = content?.site.metadata ?? SITE_CONTENT.metadata;

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteSkipLink />
      <Suspense fallback={<SiteHeaderPlaceholder />}>
        <AsyncSiteHeader />
      </Suspense>
      <main id="contenido" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Suspense fallback={<SiteFooterPlaceholder />}>
        <AsyncSiteFooter />
      </Suspense>
    </>
  );
}
