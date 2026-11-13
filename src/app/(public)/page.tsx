import type { Metadata } from "next";
import { DisciplinesSection } from "@/features/landing/components/DisciplinesSection";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { HistorySection } from "@/features/landing/components/HistorySection";
import { MembershipSection } from "@/features/landing/components/MembershipSection";
import { NewsSection } from "@/features/landing/components/NewsSection";
import { SponsorsSection } from "@/features/landing/components/SponsorsSection";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Nueva Era Sporting Club, María Teresa, Santa Fe. Fútbol, hockey, tenis, pádel, folklore y natatorio. Asociate y sumate al Tren Rojo.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DisciplinesSection />
      <MembershipSection />
      <HistorySection />
      <NewsSection />
      <SponsorsSection />
    </>
  );
}
