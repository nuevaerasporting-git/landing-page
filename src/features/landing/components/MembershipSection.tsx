import {
  MEMBERSHIP_BENEFITS,
  MEMBERSHIP_CATEGORIES,
} from "@/features/landing/data/membership";
import { SITE_INFO } from "@/features/landing/data/site";
import { ButtonLink } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/icons";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { MembershipCard } from "./MembershipCard";

export function MembershipSection() {
  return (
    <Section id="asociate" tone="muted">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div>
          <SectionHeading
            eyebrow="Asociate"
            title="Tu lugar en el club también se construye en comunidad"
            description="Ser socio es participar de la vida de NESC: sus espacios, sus disciplinas formativas, la temporada de pileta y las actividades sociales."
            tone="muted"
          />
          <ul className="mt-6 space-y-3">
            {MEMBERSHIP_BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm font-semibold text-ink-soft"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Icon name="check" className="size-3" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href={SITE_INFO.whatsappUrl} size="lg" variant="primary">
              <Icon name="whatsapp" className="size-4" />
              Consultar por WhatsApp
            </ButtonLink>
            <p className="mt-2 text-xs text-ink-soft">
              Enlace de WhatsApp pendiente de configuración.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {MEMBERSHIP_CATEGORIES.map((category) => (
            <MembershipCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </Section>
  );
}
