import { ActivitiesSection } from "@/features/content/components/landing/activities-section";
import { HeroSection } from "@/features/content/components/landing/hero-section";
import { MembershipSection } from "@/features/content/components/landing/membership-section";
import { NewsSection } from "@/features/content/components/landing/news-section";
import { SponsorsSection } from "@/features/content/components/landing/sponsors-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ActivitiesSection />
      <MembershipSection />
      <NewsSection />
      <SponsorsSection />
    </>
  );
}
