"use client";

import Image from "next/image";
import {
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import type { SectionKey } from "@/features/content/types/site-configuration";
import { uploadImage } from "@/features/media/actions/upload-image";
import type { UploadedImage } from "@/features/media/types/media";

interface ImageUploaderProps {
  section: SectionKey;
  value?: string;
  onUploaded: (result: { path: string; publicUrl: string }) => void;
  label?: string;
  disabled?: boolean;
}

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/avif";
const UPLOAD_ERROR = "No se pudo subir la imagen. Intentá de nuevo.";

export function ImageUploader({
  section,
  value,
  onUploaded,
  label = "Imagen",
  disabled = false,
}: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<UploadedImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = uploaded?.publicUrl ?? value;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event.target.files?.[0] ?? null);
    setError(null);
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    if (!disabled) setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    setSelectedFile(event.dataTransfer.files[0] ?? null);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile || isUploading || disabled) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.set("section", section);
    formData.set("image", selectedFile);

    try {
      const result = await uploadImage(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }

      const image: UploadedImage = {
        path: result.path,
        publicUrl: result.publicUrl,
      };
      setUploaded(image);
      setSelectedFile(null);
      onUploaded(image);
    } catch {
      setError(UPLOAD_ERROR);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section className="space-y-3" aria-label={label}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand ${
            isDragging ? "border-brand bg-surface" : "border-line bg-surface"
          } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
        >
          <input
            type="file"
            accept={ACCEPTED_TYPES}
            disabled={disabled || isUploading}
            onChange={handleChange}
            className="sr-only"
          />
          <span className="text-sm font-semibold text-ink">
            {selectedFile
              ? selectedFile.name
              : "Arrastrá una imagen o elegí un archivo"}
          </span>
          <span className="text-xs text-muted">
            JPEG, PNG, WebP o AVIF · hasta 5 MB
          </span>
        </label>

        {error ? (
          <p role="alert" className="text-sm font-medium text-brand">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={disabled || isUploading || !selectedFile}
          aria-busy={isUploading}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Subiendo…" : "Subir imagen"}
        </button>
      </form>

      {previewUrl ? (
        <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-lg border border-line bg-surface">
          <Image
            src={previewUrl}
            alt={`Vista previa de ${label.toLowerCase()}`}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover"
          />
        </div>
      ) : null}
    </section>
  );
}
