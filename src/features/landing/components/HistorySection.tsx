import { HISTORY_EVENTS } from "@/features/landing/data/history";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { HistoryTimeline } from "./HistoryTimeline";

export function HistorySection() {
  return (
    <Section id="historia">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
        <SectionHeading
          eyebrow="Nacidos de la unión"
          title="Una historia construida entre todos"
          description="Nueva Era Sporting Club nació el 19 de enero de 1961 en María Teresa, de la fusión del Club Sportivo Juventud Unida (1933) y el Aspirante Football Club (1945/46)."
        />
        <HistoryTimeline events={HISTORY_EVENTS} />
      </div>
    </Section>
  );
}
