import type {
  Activity,
  ActivityImage,
  CtaLink,
} from "@/features/content/types/landing";

export interface StoredActivityCard {
  name: string;
  consultationAriaLabel: string;
  id?: string;
  schedule?: string;
  image?: ActivityImage | null;
  cta?: CtaLink;
}

export type ActivityCard = Activity;

export interface ActivitiesHeader {
  title: string;
  description: string;
  pendingBadge: string;
  cardCta: CtaLink;
  mediaLabel: string;
  note: string;
}

export interface ActivitiesSection extends ActivitiesHeader {
  items: ActivityCard[];
}

export interface ActivityCardDraft {
  id?: string;
  name: string;
  consultationAriaLabel: string;
  schedule: string;
  imagePath: string | null;
  imageAlt: string;
  removeImage: boolean;
  cta: CtaLink;
}

export type OperationResult = { ok: true } | { ok: false; error: string };

export type ActivityActionResult =
  | { ok: true; section: ActivitiesSection }
  | { ok: false; error: string };

export type UploadActivityImageResult =
  | { ok: true; path: string; publicUrl: string }
  | { ok: false; error: string };
