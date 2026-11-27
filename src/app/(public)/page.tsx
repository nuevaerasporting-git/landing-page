import { ActivitiesSection } from "@/features/content/components/landing/activities-section";
import { HeroSection } from "@/features/content/components/landing/hero-section";
import { MembershipSection } from "@/features/content/components/landing/membership-section";
import { NewsSection } from "@/features/content/components/landing/news-section";
import { SponsorsSection } from "@/features/content/components/landing/sponsors-section";
import {
  ACTIVITIES,
  ACTIVITIES_CONTENT,
  HERO_CONTENT,
  MEMBERSHIP_CONTENT,
  NEWS_CONTENT,
  NEWS_PLACEHOLDERS,
  SPONSORS_CONTENT,
} from "@/features/content/data/landing";
import { connection } from "next/server";
import { getMappedSiteContent } from "@/features/content/services/site-content";
import { getPublicSponsors } from "@/features/sponsors/services/get-sponsors";

export default async function HomePage() {
  await connection();
  const content = await getMappedSiteContent();
  const sponsors = await getPublicSponsors();

  const hero = content?.hero ?? HERO_CONTENT;
  const activitiesContent = content?.activities.content ?? ACTIVITIES_CONTENT;
  const activityItems = content?.activities.items ?? ACTIVITIES;
  const membershipContent = content?.membership.content ?? MEMBERSHIP_CONTENT;
  const newsContent = content?.news.content ?? NEWS_CONTENT;
  const newsSlots = content?.news.slots ?? [...NEWS_PLACEHOLDERS];
  const sponsorsContent = content?.sponsors.content ?? SPONSORS_CONTENT;

  return (
    <>
      <HeroSection content={hero} />
      <ActivitiesSection content={activitiesContent} items={activityItems} />
      <MembershipSection content={membershipContent} />
      <NewsSection content={newsContent} slots={newsSlots} />
      <SponsorsSection content={sponsorsContent} sponsors={sponsors} />
    </>
  );
}
