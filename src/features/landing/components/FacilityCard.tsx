import type { Facility } from "@/features/landing/types";
import { Icon } from "@/shared/ui/icons";

interface FacilityCardProps {
  facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <article className="flex gap-4 rounded-lg border border-line bg-surface p-5 shadow-card">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-ink text-white">
        <Icon name="map-pin" className="size-5" />
      </span>
      <div className="min-w-0">
        <h4 className="text-base font-extrabold text-ink">{facility.name}</h4>
        <p className="mt-1 text-sm font-semibold text-brand">{facility.address}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {facility.description}
        </p>
      </div>
    </article>
  );
}
