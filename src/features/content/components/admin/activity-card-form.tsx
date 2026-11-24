"use client";

import { useState } from "react";
import { uploadActivityImageAction } from "@/features/content/actions/activities";
import type { ActivityCard } from "@/features/content/types/activities";
import type { CtaLink } from "@/features/content/types/landing";
import { ImageUploader } from "@/features/media/components/image-uploader";

interface ActivityCardFormProps {
  card: ActivityCard | null;
  defaultCta: CtaLink;
  disabled: boolean;
  onSave: (formData: FormData, isNew: boolean) => void;
  onDelete?: (id: string) => void;
  onCancel?: () => void;
}

export function ActivityCardForm({
  card,
  defaultCta,
  disabled,
  onSave,
  onDelete,
  onCancel,
}: ActivityCardFormProps) {
  const prefix = card ? `actividad-${card.id}` : "actividad-nueva";
  const [imagePath, setImagePath] = useState(card?.image?.path ?? null);
  const [publicUrl, setPublicUrl] = useState(card?.image?.publicUrl ?? null);
  const [imageAlt, setImageAlt] = useState(card?.image?.alt ?? "");
  const [removeImage, setRemoveImage] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function handleUploaded(result: { path: string; publicUrl: string }) {
    setImagePath(result.path);
    setPublicUrl(result.publicUrl);
    setRemoveImage(false);
    setImageAlt((current) => current || card?.name || "Actividad");
  }

  function handleRemove() {
    setImagePath(null);
    setPublicUrl(null);
    setRemoveImage(Boolean(card?.image));
  }

  return (
    <form
      action={(formData) => onSave(formData, card === null)}
      className="rounded-lg border border-line bg-white p-5 sm:p-6"
    >
      {card ? <input type="hidden" name="id" value={card.id} /> : null}
      <input type="hidden" name="imagePath" value={imagePath ?? ""} />
      <input
        type="hidden"
        name="removeImage"
        value={removeImage ? "true" : "false"}
      />

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-extrabold tracking-tight">
          {card ? "Editar actividad" : "Nueva actividad"}
        </h3>
        {card ? <p className="text-sm text-muted">{card.name}</p> : null}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          id={`${prefix}-name`}
          label="Título de la actividad"
          name="name"
          defaultValue={card?.name ?? ""}
          required
          disabled={disabled}
        />
        <Field
          id={`${prefix}-schedule`}
          label="Días y horarios"
          name="schedule"
          defaultValue={card?.schedule ?? ""}
          disabled={disabled}
          placeholder="Ej.: lunes y miércoles de 18 a 20"
        />
        <Field
          id={`${prefix}-aria`}
          label="Etiqueta de acceso"
          name="consultationAriaLabel"
          defaultValue={card?.consultationAriaLabel ?? ""}
          disabled={disabled}
          hint="Se usa para lectores de pantalla. Si se deja vacía, se genera desde el título."
        />
        <Field
          id={`${prefix}-cta-label`}
          label="Texto del botón"
          name="ctaLabel"
          defaultValue={card?.cta.label ?? defaultCta.label}
          required
          disabled={disabled}
        />
        <Field
          id={`${prefix}-cta-href`}
          label="Destino del botón"
          name="ctaHref"
          defaultValue={card?.cta.href ?? defaultCta.href}
          required
          disabled={disabled}
          hint="#asociate o una ruta interna como /contacto."
          wide
        />
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
          Imagen de la actividad
        </p>
        <div className="mt-3">
          <ImageUploader
            section="activities"
            label="Imagen de la actividad"
            value={publicUrl}
            onUploaded={handleUploaded}
            uploadAction={uploadActivityImageAction}
            onRemove={handleRemove}
            disabled={disabled}
          />
        </div>
        <div className="mt-4 max-w-sm">
          <label
            htmlFor={`${prefix}-alt`}
            className="block text-xs font-bold uppercase tracking-[0.1em] text-muted"
          >
            Texto alternativo
          </label>
          <input
            id={`${prefix}-alt`}
            name="imageAlt"
            value={imageAlt}
            onChange={(event) => setImageAlt(event.target.value)}
            disabled={disabled}
            className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <button
          type="submit"
          disabled={disabled}
          aria-busy={disabled}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {disabled ? "Guardando…" : "Guardar actividad"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={disabled}
            className="inline-flex min-h-11 items-center rounded-md border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-brand disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>
        ) : null}
        {onDelete && card ? (
          confirmingDelete ? (
            <div
              role="alertdialog"
              aria-label="Confirmar eliminación"
              className="flex flex-wrap items-center gap-2 rounded-md border border-brand bg-surface px-3 py-2"
            >
              <span className="text-sm font-semibold">
                ¿Eliminar esta actividad?
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => {
                  onDelete(card.id);
                  setConfirmingDelete(false);
                }}
                className="inline-flex min-h-11 items-center rounded-md bg-brand px-3 text-sm font-semibold text-white"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="inline-flex min-h-11 items-center rounded-md border border-line bg-white px-3 text-sm font-semibold text-ink"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              disabled={disabled}
              className="inline-flex min-h-11 items-center rounded-md border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-brand disabled:cursor-not-allowed disabled:opacity-60"
            >
              Eliminar
            </button>
          )
        ) : null}
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  name: string;
  defaultValue: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  hint?: string;
  wide?: boolean;
}

function Field({
  id,
  label,
  name,
  defaultValue,
  required = false,
  disabled = false,
  placeholder,
  hint,
  wide = false,
}: FieldProps) {
  return (
    <div className={wide ? "min-w-0 sm:col-span-2" : "min-w-0"}>
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-[0.1em] text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-60"
      />
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
