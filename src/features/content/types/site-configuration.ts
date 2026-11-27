import type {
  Activity,
  CtaLink,
  HeroContent,
  MembershipBlock,
  SiteContent,
} from "@/features/content/types/landing";
import type { StoredNewsItem } from "@/features/content/types/news";

export interface ActivitiesSectionData {
  title: string;
  description: string;
  pendingBadge: string;
  cardCta: CtaLink;
  mediaLabel: string;
  note: string;
  items: Activity[];
}

export interface MembershipSectionData {
  title: string;
  description: string;
  note: string;
  cta: CtaLink;
  blocks: MembershipBlock[];
}

export interface NewsSectionData {
  title: string;
  description: string;
  mediaLabel: string;
  cardTitle: string;
  cardDescription: string;
  note: string;
  placeholders: number[];
  items?: StoredNewsItem[];
}

export interface SponsorsSectionData {
  title: string;
  description: string;
  carouselHelp: string;
  regionLabel: string;
  slotLabel: string;
  note: string;
  placeholders: number[];
}

export interface Sections {
  hero: HeroContent;
  activities: ActivitiesSectionData;
  membership: MembershipSectionData;
  news: NewsSectionData;
  sponsors: SponsorsSectionData;
  site: SiteContent;
}

export type SectionKey = keyof Sections;

export interface SiteConfigurationRow {
  uuid: string;
  domain: string;
  sections: Sections;
  created_at: string;
  updated_at: string;
}
