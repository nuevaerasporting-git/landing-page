import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionTone = "white" | "muted" | "ink";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
}

const TONE_CLASSES: Record<SectionTone, string> = {
  white: "bg-surface text-ink",
  muted: "bg-surface-muted text-ink",
  ink: "bg-ink text-white",
};

export function Section({
  id,
  tone = "white",
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-12 md:py-16 ${TONE_CLASSES[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
