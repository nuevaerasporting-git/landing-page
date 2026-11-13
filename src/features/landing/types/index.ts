export type IconName =
  | "arrow-right"
  | "whatsapp"
  | "map-pin"
  | "instagram"
  | "facebook"
  | "soccer"
  | "hockey"
  | "tennis"
  | "padel"
  | "folklore"
  | "pool"
  | "users"
  | "calendar"
  | "shirt"
  | "star"
  | "menu"
  | "close"
  | "check";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface ContactPlace {
  name: string;
  address: string;
  detail: string;
}

export interface SiteInfo {
  name: string;
  foundationDate: string;
  whatsappUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  polideportivo: ContactPlace;
  sedeSocial: ContactPlace;
}

export interface Discipline {
  name: string;
  description: string;
  details: readonly string[];
  icon: IconName;
}

export interface Facility {
  name: string;
  address: string;
  description: string;
}

export interface MembershipCategory {
  name: string;
  description: string;
  priceLabel: string;
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
}

export interface NewsItem {
  title: string;
  category: string;
  summary: string;
  imageLabel: string;
}

export interface Sponsor {
  name: string;
  placeholderLabel: string;
}
