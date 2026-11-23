import type {
  ImageDescriptor,
  ImageExtension,
  ImageMimeType,
  ValidateImageResult,
} from "@/features/media/types/media";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const HEADER_LENGTH = 12;

const MIME_TO_EXTENSION: Record<ImageMimeType, ImageExtension> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] as const;
const AVIF_BRANDS = ["avif", "avis"] as const;

function readAscii(header: Uint8Array, offset: number, length: number): string {
  let text = "";
  for (let index = offset; index < offset + length; index += 1) {
    text += String.fromCharCode(header[index]);
  }
  return text;
}

function isSupportedMimeType(value: string): value is ImageMimeType {
  return Object.prototype.hasOwnProperty.call(MIME_TO_EXTENSION, value);
}

function isSvg(header: Uint8Array): boolean {
  const start = readAscii(header, 0, Math.min(5, header.length));
  return start.startsWith("<?xml") || start.startsWith("<svg");
}

function detectMimeType(header: Uint8Array): ImageMimeType | null {
  if (header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    header.length >= PNG_SIGNATURE.length &&
    PNG_SIGNATURE.every((byte, index) => header[index] === byte)
  ) {
    return "image/png";
  }

  if (header.length >= HEADER_LENGTH) {
    if (
      readAscii(header, 0, 4) === "RIFF" &&
      readAscii(header, 8, 4) === "WEBP"
    ) {
      return "image/webp";
    }

    if (readAscii(header, 4, 4) === "ftyp") {
      const brand = readAscii(header, 8, 4);
      if (AVIF_BRANDS.some((value) => value === brand)) {
        return "image/avif";
      }
    }
  }

  return null;
}

export async function validateImage(file: File): Promise<ValidateImageResult> {
  if (file.size === 0) {
    return { ok: false, error: "El archivo está vacío." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, error: "La imagen supera el tamaño máximo de 5 MB." };
  }

  const declaredType = file.type.toLowerCase();

  if (declaredType === "image/svg+xml") {
    return { ok: false, error: "Los archivos SVG no están permitidos." };
  }

  if (!isSupportedMimeType(declaredType)) {
    return {
      ok: false,
      error: "Formato no permitido. Usá una imagen JPEG, PNG, WebP o AVIF.",
    };
  }

  const headerBuffer = await file.slice(0, HEADER_LENGTH).arrayBuffer();
  const header = new Uint8Array(headerBuffer);
  const detectedType = detectMimeType(header);

  if (!detectedType) {
    if (isSvg(header)) {
      return { ok: false, error: "Los archivos SVG no están permitidos." };
    }
    return {
      ok: false,
      error: "No se pudo identificar el formato de la imagen.",
    };
  }

  if (detectedType !== declaredType) {
    return {
      ok: false,
      error: "El contenido del archivo no coincide con el tipo declarado.",
    };
  }

  const descriptor: ImageDescriptor = {
    extension: MIME_TO_EXTENSION[declaredType],
    mimeType: declaredType,
  };

  return { ok: true, ...descriptor };
}
