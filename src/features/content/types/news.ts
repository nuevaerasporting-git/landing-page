export interface StoredNewsItem {
  id: string;
  title: string;
  publishedAt: string;
  description: string;
  instagramUrl: string;
  imagePath: string;
}

export interface NewsItem extends StoredNewsItem {
  imagePublicUrl: string;
}

export interface NewsDraft {
  title: string;
  publishedAt: string;
  description: string;
  instagramUrl: string;
  imagePath: string;
}

export interface NewsSection {
  title: string;
  description: string;
  mediaLabel: string;
  cardTitle: string;
  cardDescription: string;
  note: string;
  placeholders: number[];
  items: NewsItem[];
}

export type NewsValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export type NewsReadResult =
  | { ok: true; section: NewsSection }
  | { ok: false; error: string };

export type NewsMutationResult =
  | { ok: true; items: NewsItem[] }
  | { ok: false; error: string };

export type NewsImageUploadResult =
  | { ok: true; path: string; publicUrl: string; uploadToken: string }
  | { ok: false; error: string };
