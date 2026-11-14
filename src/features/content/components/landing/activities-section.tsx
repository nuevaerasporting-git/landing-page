import { ACTIVITIES } from "@/features/content/data/landing";
import { MediaPlaceholder } from "@/shared/ui/media-placeholder";
import { PendingBadge } from "@/shared/ui/pending-badge";
import { Section } from "@/shared/ui/section";

export function ActivitiesSection() {
  return (
    <Section
      id="actividades"
      title="Encontrá tu lugar en Nueva Era"
      description="Un club con espacio para jugar, aprender y compartir."
      headingAside={
        <PendingBadge className="self-start">
          Disciplinas a confirmar
        </PendingBadge>
      }
    >
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {ACTIVITIES.map((activity) => (
          <li key={activity.name}>
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-brand/50">
              <span aria-hidden="true" className="h-1 w-full bg-brand" />
              <MediaPlaceholder
                label="Imagen del club pendiente"
                framed={false}
                className="aspect-[4/3]"
              />
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-lg font-bold tracking-tight text-ink">
                  {activity.name}
                </h3>
                <a
                  href="#asociate"
                  aria-label={`Consultar sobre ${activity.name}`}
                  className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  Consultar actividad
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        La oferta actual de disciplinas, categorías y horarios está pendiente de
        confirmación con el club.
      </p>
    </Section>
  );
}
