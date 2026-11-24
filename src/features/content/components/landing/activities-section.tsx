import Image from "next/image";
import type {
  ActivitiesContent,
  Activity,
} from "@/features/content/types/landing";
import { MediaPlaceholder } from "@/shared/ui/media-placeholder";
import { PendingBadge } from "@/shared/ui/pending-badge";
import { Section } from "@/shared/ui/section";

interface ActivitiesSectionProps {
  content: ActivitiesContent;
  items: Activity[];
}

export function ActivitiesSection({ content, items }: ActivitiesSectionProps) {
  return (
    <Section
      id="actividades"
      title={content.title}
      description={content.description}
      headingAside={
        <PendingBadge className="self-start">
          {content.pendingBadge}
        </PendingBadge>
      }
    >
      {items.length === 0 ? (
        <p
          role="status"
          className="rounded-lg border border-dashed border-line bg-surface p-5 text-sm text-muted"
        >
          Todavía no hay actividades publicadas.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((activity) => (
            <li key={activity.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-brand/50">
                <span aria-hidden="true" className="h-1 w-full bg-brand" />
                {activity.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={activity.image.publicUrl}
                      alt={activity.image.alt || activity.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <MediaPlaceholder
                    label={content.mediaLabel}
                    framed={false}
                    className="aspect-[4/3]"
                  />
                )}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-lg font-bold tracking-tight text-ink">
                    {activity.name}
                  </h3>
                  {activity.schedule ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {activity.schedule}
                    </p>
                  ) : null}
                  <a
                    href={activity.cta.href}
                    aria-label={activity.consultationAriaLabel}
                    className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                  >
                    {activity.cta.label}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 text-sm leading-relaxed text-muted">{content.note}</p>
    </Section>
  );
}
