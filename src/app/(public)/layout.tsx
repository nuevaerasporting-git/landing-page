import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense, type ReactNode } from "react";
import {
  PublicChrome,
  SiteChrome,
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
    <Suspense
      fallback={<PublicChrome site={SITE_CONTENT}>{children}</PublicChrome>}
    >
      <SiteChrome>{children}</SiteChrome>
    </Suspense>
  );
}
