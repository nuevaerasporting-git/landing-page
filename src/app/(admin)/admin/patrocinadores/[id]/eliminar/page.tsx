import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { DeleteSponsorForm } from "@/features/sponsors/components/delete-sponsor-form";
import { getAdminSponsor } from "@/features/sponsors/services/get-sponsors";

interface DeleteSponsorPageProps {
  params: Promise<{ id: string }>;
}

export default async function DeleteSponsorPage({
  params,
}: DeleteSponsorPageProps) {
  await connection();
  const { id } = await params;
  const sponsor = await getAdminSponsor(id);
  if (!sponsor) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <header>
        <Link
          href="/admin/patrocinadores"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-muted transition-colors hover:text-brand"
        >
          Volver a patrocinadores
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
          Eliminar patrocinador
        </h1>
      </header>

      <div role="alert" className="rounded-lg border border-line bg-white p-5 sm:p-6">
        <p className="text-sm font-bold">
          ¿Querés eliminar a {sponsor.name}?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Se va a borrar el registro y su logo. Esta acción no se puede
          deshacer. Si solo querés ocultarlo, usá “Editar” y desmarcá “Visible
          en el sitio”.
        </p>
        <div className="mt-5">
          <DeleteSponsorForm sponsorId={sponsor.id} />
        </div>
      </div>
    </div>
  );
}
