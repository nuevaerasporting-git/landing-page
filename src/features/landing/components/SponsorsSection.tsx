import { SPONSORS } from "@/features/landing/data/sponsors";
import { Icon } from "@/shared/ui/icons";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { SponsorSlot } from "./SponsorSlot";

export function SponsorsSection() {
  return (
    <Section id="sponsors">
      <SectionHeading
        eyebrow="Sponsors y merchandising"
        title="Auspician y acompañan al club"
        description="Un espacio para los comercios de María Teresa que acompañan a NESC."
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SPONSORS.map((sponsor) => (
          <SponsorSlot key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-4 rounded-lg bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand text-white">
            <Icon name="shirt" className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-extrabold">Indumentaria oficial NESC</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/75">
              Gorras y camisetas del club. Consultá disponibilidad en Secretaría.
            </p>
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
          Merchandising oficial
        </p>
      </div>
    </Section>
  );
}
