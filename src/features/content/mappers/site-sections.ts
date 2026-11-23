import type {
  ActivitiesContent,
  Activity,
  HeroContent,
  MembershipBlock,
  MembershipContent,
  NewsContent,
  SiteContent,
  SponsorsContent,
} from "@/features/content/types/landing";
import type { Sections } from "@/features/content/types/site-configuration";

export interface MappedSiteContent {
  hero: HeroContent;
  activities: { content: ActivitiesContent; items: Activity[] };
  membership: { content: MembershipContent; blocks: MembershipBlock[] };
  news: { content: NewsContent; slots: number[] };
  sponsors: { content: SponsorsContent; slots: number[] };
  site: SiteContent;
}

export function mapSections(sections: Sections): MappedSiteContent {
  return {
    hero: mapHero(sections.hero),
    activities: {
      content: mapActivitiesContent(sections.activities),
      items: sections.activities.items.map(mapActivity),
    },
    membership: {
      content: mapMembershipContent(sections.membership),
      blocks: sections.membership.blocks.map(mapMembershipBlock),
    },
    news: {
      content: mapNewsContent(sections.news),
      slots: sections.news.placeholders.map((slot) => slot),
    },
    sponsors: {
      content: mapSponsorsContent(sections.sponsors),
      slots: sections.sponsors.placeholders.map((slot) => slot),
    },
    site: mapSite(sections.site),
  };
}

function mapHero(hero: Sections["hero"]): HeroContent {
  return {
    eyebrow: hero.eyebrow,
    titleLead: hero.titleLead,
    titleEmphasis: hero.titleEmphasis,
    subtitle: hero.subtitle,
    primaryCta: { href: hero.primaryCta.href, label: hero.primaryCta.label },
    secondaryCta: { href: hero.secondaryCta.href, label: hero.secondaryCta.label },
    note: hero.note,
    media: { label: hero.media.label, detail: hero.media.detail },
  };
}

function mapActivitiesContent(
  activities: Sections["activities"],
): ActivitiesContent {
  return {
    title: activities.title,
    description: activities.description,
    pendingBadge: activities.pendingBadge,
    cardCta: { href: activities.cardCta.href, label: activities.cardCta.label },
    mediaLabel: activities.mediaLabel,
    note: activities.note,
  };
}

function mapActivity(item: Activity): Activity {
  return {
    name: item.name,
    consultationAriaLabel: item.consultationAriaLabel,
  };
}

function mapMembershipContent(
  membership: Sections["membership"],
): MembershipContent {
  return {
    title: membership.title,
    description: membership.description,
    note: membership.note,
    cta: { href: membership.cta.href, label: membership.cta.label },
  };
}

function mapMembershipBlock(block: MembershipBlock): MembershipBlock {
  return { title: block.title, description: block.description };
}

function mapNewsContent(news: Sections["news"]): NewsContent {
  return {
    title: news.title,
    description: news.description,
    mediaLabel: news.mediaLabel,
    cardTitle: news.cardTitle,
    cardDescription: news.cardDescription,
    note: news.note,
  };
}

function mapSponsorsContent(sponsors: Sections["sponsors"]): SponsorsContent {
  return {
    title: sponsors.title,
    description: sponsors.description,
    carouselHelp: sponsors.carouselHelp,
    regionLabel: sponsors.regionLabel,
    slotLabel: sponsors.slotLabel,
    note: sponsors.note,
  };
}

function mapSite(site: Sections["site"]): SiteContent {
  return {
    metadata: {
      title: site.metadata.title,
      description: site.metadata.description,
    },
    navigation: site.navigation.map((item) => ({
      label: item.label,
      href: item.href,
    })),
    wordmark: {
      image: {
        src: site.wordmark.image.src,
        alt: site.wordmark.image.alt,
        width: site.wordmark.image.width,
        height: site.wordmark.image.height,
      },
      primaryLine: site.wordmark.primaryLine,
      secondaryLine: site.wordmark.secondaryLine,
    },
    header: {
      homeHref: site.header.homeHref,
      homeAriaLabel: site.header.homeAriaLabel,
      primaryNavLabel: site.header.primaryNavLabel,
      cta: { href: site.header.cta.href, label: site.header.cta.label },
    },
    mobileNav: {
      openMenuLabel: site.mobileNav.openMenuLabel,
      closeMenuLabel: site.mobileNav.closeMenuLabel,
      navLabel: site.mobileNav.navLabel,
      cta: { href: site.mobileNav.cta.href, label: site.mobileNav.cta.label },
    },
    footer: {
      locationPrimary: site.footer.locationPrimary,
      locationSecondary: site.footer.locationSecondary,
      navLabel: site.footer.navLabel,
      sectionsLabel: site.footer.sectionsLabel,
      contactLabel: site.footer.contactLabel,
      contactDescription: site.footer.contactDescription,
      locationLabel: site.footer.locationLabel,
      locationDescription: site.footer.locationDescription,
      copyright: site.footer.copyright,
    },
    accessibility: { skipLinkLabel: site.accessibility.skipLinkLabel },
  };
}
