import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Container } from "./container";

type SectionTone = "white" | "surface";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  tone?: SectionTone;
  headingAside?: ReactNode;
  children: ReactNode;
}

const TONE_CLASSES: Record<SectionTone, string> = {
  white: "bg-white",
  surface: "bg-surface",
};

export function Section({
  id,
  title,
  description,
  tone = "white",
  headingAside,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16",
        TONE_CLASSES[tone],
      )}
    >
      <Container>
        <div className="mb-8 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {headingAside}
        </div>
        {children}
      </Container>
    </section>
  );
}
