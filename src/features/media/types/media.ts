export type ImageMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/avif";

export type ImageExtension = "jpg" | "png" | "webp" | "avif";

export interface ImageDescriptor {
  extension: ImageExtension;
  mimeType: ImageMimeType;
}

export type ValidateImageResult =
  | ({ ok: true } & ImageDescriptor)
  | { ok: false; error: string };

export interface UploadedImage {
  path: string;
  publicUrl: string;
}

export type UploadImageResult =
  | ({ ok: true } & UploadedImage)
  | { ok: false; error: string };
