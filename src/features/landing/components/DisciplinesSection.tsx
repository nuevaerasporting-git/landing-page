import { DISCIPLINES, FACILITIES } from "@/features/landing/data/disciplines";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { DisciplineCard } from "./DisciplineCard";
import { FacilityCard } from "./FacilityCard";

export function DisciplinesSection() {
  return (
    <Section id="disciplinas">
      <SectionHeading
        eyebrow="Disciplinas e instalaciones"
        title="Un club para jugar, aprender y compartir"
        description="Estas son las actividades y los espacios que forman parte de la vida deportiva y social de NESC."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DISCIPLINES.map((discipline) => (
          <DisciplineCard key={discipline.name} discipline={discipline} />
        ))}
      </div>
      <div className="mt-12">
        <h3 className="text-xl font-extrabold text-ink">Nuestros espacios</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {FACILITIES.map((facility) => (
            <FacilityCard key={facility.name} facility={facility} />
          ))}
        </div>
      </div>
    </Section>
  );
}
