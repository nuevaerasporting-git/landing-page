import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { SponsorForm } from "@/features/sponsors/components/sponsor-form";
import { getAdminSponsor } from "@/features/sponsors/services/get-sponsors";

interface EditSponsorPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSponsorPage({ params }: EditSponsorPageProps) {
  await connection();
  const { id } = await params;
  const sponsor = await getAdminSponsor(id);
  if (!sponsor) notFound();

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
          Editar patrocinador
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {sponsor.name} · los cambios se reflejan en la portada.
        </p>
      </header>
      <SponsorForm mode="edit" sponsor={sponsor} />
    </div>
  );
}
