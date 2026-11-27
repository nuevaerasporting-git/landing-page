import Link from "next/link";
import { SponsorForm } from "@/features/sponsors/components/sponsor-form";

export default function NewSponsorPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <header>
        <Link
          href="/admin/patrocinadores"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors hover:text-brand"
        >
          Volver a patrocinadores
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
          Nuevo patrocinador
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Subí el logo y completá los datos. Podés dejar el sitio web en blanco.
        </p>
      </header>
      <SponsorForm mode="create" />
    </div>
  );
}
