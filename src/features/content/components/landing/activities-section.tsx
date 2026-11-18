import {
  ACTIVITIES,
  ACTIVITIES_CONTENT,
} from "@/features/content/data/landing";
import { MediaPlaceholder } from "@/shared/ui/media-placeholder";
import { PendingBadge } from "@/shared/ui/pending-badge";
import { Section } from "@/shared/ui/section";

export function ActivitiesSection() {
  return (
    <Section
      id="actividades"
      title={ACTIVITIES_CONTENT.title}
      description={ACTIVITIES_CONTENT.description}
      headingAside={
        <PendingBadge className="self-start">
          {ACTIVITIES_CONTENT.pendingBadge}
        </PendingBadge>
      }
    >
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {ACTIVITIES.map((activity) => (
          <li key={activity.name}>
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-brand/50">
              <span aria-hidden="true" className="h-1 w-full bg-brand" />
              <MediaPlaceholder
                label={ACTIVITIES_CONTENT.mediaLabel}
                framed={false}
                className="aspect-[4/3]"
              />
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-lg font-bold tracking-tight text-ink">
                  {activity.name}
                </h3>
                <a
                  href={ACTIVITIES_CONTENT.cardCta.href}
                  aria-label={activity.consultationAriaLabel}
                  className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  {ACTIVITIES_CONTENT.cardCta.label}
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        {ACTIVITIES_CONTENT.note}
      </p>
    </Section>
  );
}
