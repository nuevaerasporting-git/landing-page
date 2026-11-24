import type {
  ActivitiesHeader,
  ActivityCardDraft,
} from "@/features/content/types/activities";
import type { CtaLink } from "@/features/content/types/landing";

type ValidationResult<T> = { ok: true; value: T } | { ok: false; error: string };

const LIMITS = {
  title: 120,
  description: 300,
  badge: 80,
  mediaLabel: 120,
  note: 400,
  schedule: 500,
  ctaLabel: 60,
  ctaHref: 200,
  alt: 120,
  ariaLabel: 160,
  path: 200,
} as const;

const IMAGE_PATH_PATTERN = /^activities\/[0-9a-f-]{36}\.(jpg|png|webp|avif)$/;
const INTERNAL_HREF_PATTERN = /^(?:#[A-Za-z][A-Za-z0-9_-]*|\/(?!\/)[^\s<>\\]+)$/;
const SCHEME_PATTERN = /^[a-z][a-z0-9+.-]*:/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(
  value: unknown,
  label: string,
  maxLength: number,
): ValidationResult<string> {
  if (typeof value !== "string") {
    return { ok: false, error: `${label}: ingresá un texto válido.` };
  }

  const text = value.trim();
  if (text.length > maxLength) {
    return {
      ok: false,
      error: `${label}: no puede superar ${maxLength} caracteres.`,
    };
  }

  return { ok: true, value: text };
}

function readRequiredText(
  value: unknown,
  label: string,
  maxLength: number,
): ValidationResult<string> {
  const result = readText(value, label, maxLength);
  if (!result.ok) return result;
  if (result.value.length === 0) {
    return { ok: false, error: `${label} es obligatorio.` };
  }
  return result;
}

function validateCta(value: unknown, label: string): ValidationResult<CtaLink> {
  if (!isRecord(value)) {
    return { ok: false, error: `${label}: datos incompletos.` };
  }

  const href = readRequiredText(value.href, `${label} · destino`, LIMITS.ctaHref);
  if (!href.ok) return href;

  if (
    !INTERNAL_HREF_PATTERN.test(href.value) ||
    href.value.startsWith("//") ||
    href.value.startsWith("/%2f") ||
    SCHEME_PATTERN.test(href.value)
  ) {
    return {
      ok: false,
      error: `${label} · destino: usá una ancla (#asociate) o una ruta interna (/contacto).`,
    };
  }

  const ctaLabel = readRequiredText(
    value.label,
    `${label} · texto`,
    LIMITS.ctaLabel,
  );
  if (!ctaLabel.ok) return ctaLabel;

  return { ok: true, value: { href: href.value, label: ctaLabel.value } };
}

export function validateActivitiesHeader(
  value: unknown,
): ValidationResult<ActivitiesHeader> {
  if (!isRecord(value)) {
    return { ok: false, error: "No se recibieron los datos de la sección." };
  }

  const title = readRequiredText(value.title, "Título de la sección", LIMITS.title);
  if (!title.ok) return title;

  const description = readText(
    value.description ?? "",
    "Descripción",
    LIMITS.description,
  );
  if (!description.ok) return description;

  const pendingBadge = readText(
    value.pendingBadge ?? "",
    "Etiqueta de pendiente",
    LIMITS.badge,
  );
  if (!pendingBadge.ok) return pendingBadge;

  const mediaLabel = readText(
    value.mediaLabel ?? "",
    "Etiqueta de imagen",
    LIMITS.mediaLabel,
  );
  if (!mediaLabel.ok) return mediaLabel;

  const note = readText(value.note ?? "", "Nota", LIMITS.note);
  if (!note.ok) return note;

  const cardCta = validateCta(value.cardCta, "Botón de las tarjetas");
  if (!cardCta.ok) return cardCta;

  return {
    ok: true,
    value: {
      title: title.value,
      description: description.value,
      pendingBadge: pendingBadge.value,
      cardCta: cardCta.value,
      mediaLabel: mediaLabel.value,
      note: note.value,
    },
  };
}

export function validateActivityCard(
  value: unknown,
  fallbackCta: CtaLink,
): ValidationResult<ActivityCardDraft> {
  if (!isRecord(value)) {
    return { ok: false, error: "No se recibieron los datos de la actividad." };
  }

  const name = readRequiredText(value.name, "Título de la actividad", LIMITS.title);
  if (!name.ok) return name;

  const schedule = readText(
    value.schedule ?? "",
    "Días y horarios",
    LIMITS.schedule,
  );
  if (!schedule.ok) return schedule;

  const imageAlt = readText(
    value.imageAlt ?? "",
    "Texto alternativo",
    LIMITS.alt,
  );
  if (!imageAlt.ok) return imageAlt;

  const ariaLabel = readText(
    value.consultationAriaLabel ?? "",
    "Etiqueta de acceso",
    LIMITS.ariaLabel,
  );
  if (!ariaLabel.ok) return ariaLabel;

  const cta: ValidationResult<CtaLink> =
    value.cta === undefined || value.cta === null || value.cta === ""
      ? { ok: true, value: fallbackCta }
      : validateCta(value.cta, "Botón de la actividad");
  if (!cta.ok) return cta;

  let imagePath: string | null = null;
  if (
    value.imagePath !== undefined &&
    value.imagePath !== null &&
    value.imagePath !== ""
  ) {
    const path = readText(value.imagePath, "Imagen", LIMITS.path);
    if (!path.ok) return path;
    if (!IMAGE_PATH_PATTERN.test(path.value)) {
      return {
        ok: false,
        error: "La imagen seleccionada no es válida. Volvé a subirla.",
      };
    }
    imagePath = path.value;
  }

  const id =
    typeof value.id === "string" && value.id.trim().length > 0
      ? value.id.trim()
      : undefined;

  return {
    ok: true,
    value: {
      id,
      name: name.value,
      consultationAriaLabel:
        ariaLabel.value || `Consultar sobre ${name.value}`,
      schedule: schedule.value,
      imagePath,
      imageAlt: imageAlt.value,
      removeImage: value.removeImage === true,
      cta: cta.value,
    },
  };
}

export function validateCardId(value: unknown): ValidationResult<string> {
  return readRequiredText(value, "Identificador de la actividad", LIMITS.path);
}
