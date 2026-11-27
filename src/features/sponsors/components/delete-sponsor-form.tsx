"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { deleteSponsor } from "@/features/sponsors/actions/delete-sponsor";

export function DeleteSponsorForm({ sponsorId }: { sponsorId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await deleteSponsor(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/admin/patrocinadores");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" value={sponsorId} />
      {error ? (
        <p role="alert" className="text-sm font-medium text-brand">
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
          {isPending ? "Eliminando…" : "Eliminar patrocinador"}
        </button>
        <Link
          href="/admin/patrocinadores"
          className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-muted transition-colors hover:text-brand"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
