import type { MembershipContent } from "@/features/content/types/landing";
import { AssociateForm } from "@/features/content/components/landing/associate-form";
import { Container } from "@/shared/ui/container";

interface MembershipSectionProps {
  content: MembershipContent;
}

export function MembershipSection({ content }: MembershipSectionProps) {
  return (
    <section id="asociate" className="bg-brand text-white">
      <Container className="py-10 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed sm:text-lg">
              {content.description}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white sm:text-base">
              {content.note}
            </p>
          </div>

          <AssociateForm submitLabel={content.cta.label} />
        </div>
      </Container>
    </section>
  );
}
