"use client";

import { useState, type FormEvent } from "react";
import { uploadNewsImageAction } from "@/features/content/actions/news";
import type { NewsItem } from "@/features/content/types/news";
import { ImageUploader } from "@/features/media/components/image-uploader";
import type { UploadedImageDetails } from "@/features/media/types/media";

interface NewsFormProps {
  item: NewsItem | null;
  isPending: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
}

const INPUT_CLASS =
  "mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm text-ink";

export function NewsForm({
  item,
  isPending,
  onCancel,
  onSubmit,
}: NewsFormProps) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [publishedAt, setPublishedAt] = useState(item?.publishedAt ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [instagramUrl, setInstagramUrl] = useState(item?.instagramUrl ?? "");
  const [imagePath, setImagePath] = useState(item?.imagePath ?? "");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [uploadToken, setUploadToken] = useState("");

  const headingId = item ? "news-form-edit-title" : "news-form-create-title";

  function handleUploaded(result: UploadedImageDetails) {
    setImagePath(result.path);
    setUploadedImagePath(result.path);
    setUploadToken(result.uploadToken ?? "");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending || imagePath.length === 0) return;
    onSubmit(new FormData(event.currentTarget));
  }

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-lg border border-line bg-white p-5 sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 id={headingId} className="text-lg font-extrabold tracking-tight">
            {item ? "Editar noticia" : "Nueva noticia"}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {item
              ? "El identificador se conserva al guardar."
              : "Completá los datos y subí una imagen."}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-line px-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancelar
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
        <form onSubmit={handleSubmit} aria-busy={isPending} className="space-y-5">
          {item ? <input type="hidden" name="id" value={item.id} /> : null}
          <input type="hidden" name="imagePath" value={imagePath} />
          {uploadedImagePath ? (
            <input type="hidden" name="uploadedImagePath" value={uploadedImagePath} />
          ) : null}
          {uploadToken ? (
            <input type="hidden" name="uploadToken" value={uploadToken} />
          ) : null}

          <div>
            <label htmlFor="news-title" className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
              Título
            </label>
            <input
              id="news-title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isPending}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="news-date" className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
              Fecha de publicación
            </label>
            <input
              id="news-date"
              name="publishedAt"
              type="date"
              required
              value={publishedAt}
              onChange={(event) => setPublishedAt(event.target.value)}
              disabled={isPending}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="news-description" className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
              Descripción breve
            </label>
            <textarea
              id="news-description"
              name="description"
              required
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={isPending}
              className="mt-2 min-h-24 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
            />
          </div>

          <div>
            <label htmlFor="news-instagram" className="text-xs font-bold uppercase tracking-[0.1em] text-muted">
              Enlace a Instagram
            </label>
            <input
              id="news-instagram"
              name="instagramUrl"
              type="url"
              required
              value={instagramUrl}
              onChange={(event) => setInstagramUrl(event.target.value)}
              disabled={isPending}
              className={INPUT_CLASS}
            />
          </div>

          <button
            type="submit"
            disabled={isPending || imagePath.length === 0}
            aria-busy={isPending}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Guardando…" : item ? "Guardar cambios" : "Crear noticia"}
          </button>

          {imagePath.length === 0 ? (
            <p className="text-xs text-muted">
              Subí una imagen antes de guardar la noticia.
            </p>
          ) : null}
        </form>

        <ImageUploader
          section="news"
          value={item?.imagePublicUrl ?? null}
          onUploaded={handleUploaded}
          label="Imagen de la noticia"
          disabled={isPending}
          uploadAction={uploadNewsImageAction}
        />
      </div>
    </section>
  );
}
