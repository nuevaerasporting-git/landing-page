"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { ImageUploader } from "@/features/media/components/image-uploader";
import { createSponsor } from "@/features/sponsors/actions/create-sponsor";
import { updateSponsor } from "@/features/sponsors/actions/update-sponsor";
import type { Sponsor } from "@/features/sponsors/types/sponsor";

interface SponsorFormProps {
  mode: "create" | "edit";
  sponsor?: Sponsor;
}

const INPUT_CLASS =
  "mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm text-ink";

export function SponsorForm({ mode, sponsor }: SponsorFormProps) {
  const router = useRouter();
  const [logoPath, setLogoPath] = useState(sponsor?.logoPath ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!logoPath) {
      setError("Subí el logo del patrocinador antes de guardar.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("logoPath", logoPath);
    setError(null);

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createSponsor(formData)
          : await updateSponsor(formData);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      router.push("/admin/patrocinadores");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <ImageUploader
        section="sponsors"
        value={sponsor?.logoUrl}
        label="Logo del patrocinador"
        onUploaded={(image) => {
          setLogoPath(image.path);
          setError(null);
        }}
      />

      <form
        onSubmit={handleSubmit}
        aria-describedby={error ? "sponsor-form-error" : undefined}
        className="space-y-5 rounded-lg border border-line bg-white p-5 sm:p-6"
        noValidate
      >
        <input type="hidden" name="id" value={sponsor?.id ?? ""} />
        <input
          type="hidden"
          name="existingLogoPath"
          value={sponsor?.logoPath ?? ""}
        />
        <input type="hidden" name="logoPath" value={logoPath} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="sponsor-name" className="block text-xs font-bold uppercase tracking-[0.1em] text-muted">
              Nombre
            </label>
            <input
              id="sponsor-name"
              name="name"
              type="text"
              required
              maxLength={80}
              defaultValue={sponsor?.name}
              className={INPUT_CLASS}
            />
          </div>

          <div className="min-w-0">
            <label htmlFor="sponsor-alt" className="block text-xs font-bold uppercase tracking-[0.1em] text-muted">
              Texto alternativo del logo
            </label>
            <input
              id="sponsor-alt"
              name="logoAlt"
              type="text"
              required
              maxLength={120}
              defaultValue={sponsor?.logoAlt}
              className={INPUT_CLASS}
            />
          </div>

          <div className="min-w-0">
            <label htmlFor="sponsor-website" className="block text-xs font-bold uppercase tracking-[0.1em] text-muted">
              Sitio web (opcional)
            </label>
            <input
              id="sponsor-website"
              name="websiteUrl"
              type="url"
              maxLength={500}
              placeholder="https://..."
              defaultValue={sponsor?.websiteUrl ?? ""}
              className={INPUT_CLASS}
            />
          </div>

          <div className="min-w-0">
            <label htmlFor="sponsor-order" className="block text-xs font-bold uppercase tracking-[0.1em] text-muted">
              Orden
            </label>
            <input
              id="sponsor-order"
              name="sortOrder"
              type="number"
              min={0}
              max={9999}
              step={1}
              defaultValue={sponsor?.sortOrder ?? 0}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <label htmlFor="sponsor-active" className="flex min-h-11 items-center gap-3 text-sm font-semibold text-ink">
          <input
            id="sponsor-active"
            name="isActive"
            type="checkbox"
            value="on"
            defaultChecked={sponsor?.isActive ?? true}
            className="h-5 w-5 accent-brand"
          />
          Visible en el sitio
        </label>

        {error ? (
          <p id="sponsor-form-error" role="alert" className="text-sm font-medium text-brand">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Guardando…" : "Guardar patrocinador"}
          </button>
          <Link
            href="/admin/patrocinadores"
            className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-muted transition-colors hover:text-brand"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
