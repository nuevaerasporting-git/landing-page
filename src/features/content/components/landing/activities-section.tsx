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
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((activity) => (
          <li key={activity.name}>
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-brand/50">
              <span aria-hidden="true" className="h-1 w-full bg-brand" />
              <MediaPlaceholder
                label={content.mediaLabel}
                framed={false}
                className="aspect-[4/3]"
              />
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-lg font-bold tracking-tight text-ink">
                  {activity.name}
                </h3>
                <a
                  href={content.cardCta.href}
                  aria-label={activity.consultationAriaLabel}
                  className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  {content.cardCta.label}
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        {content.note}
      </p>
    </Section>
  );
}
