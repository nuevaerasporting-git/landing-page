export interface NavItem {
  label: string;
  href: string;
}

export interface ActivityImage {
  path: string;
  publicUrl: string;
  alt: string;
}

export interface Activity {
  id: string;
  name: string;
  consultationAriaLabel: string;
  schedule: string;
  image: ActivityImage | null;
  cta: CtaLink;
}

export interface MembershipBlock {
  title: string;
  description: string;
}

export interface CtaLink {
  href: string;
  label: string;
}

export interface MediaPlaceholderContent {
  label: string;
  detail?: string;
}

export interface HeroContent {
  eyebrow: string;
  titleLead: string;
  titleEmphasis: string;
  subtitle: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  note: string;
  media: MediaPlaceholderContent;
}

export interface ActivitiesContent {
  title: string;
  description: string;
  pendingBadge: string;
  cardCta: CtaLink;
  mediaLabel: string;
  note: string;
}

export interface MembershipContent {
  title: string;
  description: string;
  note: string;
  cta: CtaLink;
}

export interface NewsContent {
  title: string;
  description: string;
  mediaLabel: string;
  cardTitle: string;
  cardDescription: string;
  note: string;
}

export interface SponsorsContent {
  title: string;
  description: string;
  carouselHelp: string;
  regionLabel: string;
  slotLabel: string;
  note: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
}

export interface SiteHeaderContent {
  homeHref: string;
  homeAriaLabel: string;
  primaryNavLabel: string;
  cta: CtaLink;
}

export interface SiteMobileNavContent {
  openMenuLabel: string;
  closeMenuLabel: string;
  navLabel: string;
  cta: CtaLink;
}

export interface SiteFooterContent {
  locationPrimary: string;
  locationSecondary: string;
  navLabel: string;
  sectionsLabel: string;
  contactLabel: string;
  contactDescription: string;
  locationLabel: string;
  locationDescription: string;
  copyright: string;
}

export interface SiteWordmarkContent {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  primaryLine: string;
  secondaryLine: string;
}

export interface SiteAccessibilityContent {
  skipLinkLabel: string;
}

export interface SiteContent {
  metadata: SiteMetadata;
  navigation: NavItem[];
  wordmark: SiteWordmarkContent;
  header: SiteHeaderContent;
  mobileNav: SiteMobileNavContent;
  footer: SiteFooterContent;
  accessibility: SiteAccessibilityContent;
}
