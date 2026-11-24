"use client";

import type { ActivitiesHeader } from "@/features/content/types/activities";

interface ActivitiesHeaderFormProps {
  header: ActivitiesHeader;
  disabled: boolean;
  onSave: (formData: FormData) => void;
}

interface FieldProps {
  id: string;
  label: string;
  name: string;
  defaultValue: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  wide?: boolean;
  hint?: string;
}

export function ActivitiesHeaderForm({
  header,
  disabled,
  onSave,
}: ActivitiesHeaderFormProps) {
  return (
    <section
      aria-labelledby="activities-header-title"
      className="rounded-lg border border-line bg-white p-5 sm:p-6"
    >
      <h2
        id="activities-header-title"
        className="text-xl font-extrabold tracking-tight"
      >
        Textos de la sección
      </h2>
      <p className="mt-1 text-sm text-muted">
        Se muestran en la landing. Los cambios se publican al guardar.
      </p>

      <form action={onSave} className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          id="activities-header-name"
          label="Título"
          name="title"
          defaultValue={header.title}
          required
          disabled={disabled}
        />
        <Field
          id="activities-header-badge"
          label="Etiqueta de pendiente"
          name="pendingBadge"
          defaultValue={header.pendingBadge}
          disabled={disabled}
        />
        <Field
          id="activities-header-media-label"
          label="Etiqueta de imagen"
          name="mediaLabel"
          defaultValue={header.mediaLabel}
          disabled={disabled}
        />
        <Field
          id="activities-header-description"
          label="Descripción"
          name="description"
          defaultValue={header.description}
          multiline
          wide
          disabled={disabled}
        />
        <Field
          id="activities-header-note"
          label="Nota"
          name="note"
          defaultValue={header.note}
          multiline
          wide
          disabled={disabled}
        />

        <fieldset className="min-w-0 rounded-lg border border-line bg-surface p-4 sm:col-span-2">
          <legend className="px-1 text-xs font-bold uppercase tracking-[0.1em] text-muted">
            Botón de las tarjetas
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="activities-header-cta-label"
              label="Texto del botón"
              name="cardCtaLabel"
              defaultValue={header.cardCta.label}
              required
              disabled={disabled}
            />
            <Field
              id="activities-header-cta-href"
              label="Destino"
              name="cardCtaHref"
              defaultValue={header.cardCta.href}
              required
              disabled={disabled}
              hint="Solo destinos internos: #asociate o /contacto."
            />
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={disabled}
            aria-busy={disabled}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {disabled ? "Guardando…" : "Guardar textos"}
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  id,
  label,
  name,
  defaultValue,
  required = false,
  disabled = false,
  multiline = false,
  wide = false,
  hint,
}: FieldProps) {
  const classes =
    "mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className={wide ? "min-w-0 sm:col-span-2" : "min-w-0"}>
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-[0.1em] text-muted"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          rows={3}
          className={`${classes} min-h-24 resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          className={`${classes} h-11`}
        />
      )}
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
