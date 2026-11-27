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
  SPONSOR_PLACEHOLDERS,
} from "@/features/content/data/landing";
import { connection } from "next/server";
import { readPublicNewsSection } from "@/features/content/repositories/public-news";
import { getMappedSiteContent } from "@/features/content/services/site-content";

export default async function HomePage() {
  await connection();
  const content = await getMappedSiteContent();
  const publicNews = await readPublicNewsSection();

  const hero = content?.hero ?? HERO_CONTENT;
  const activitiesContent = content?.activities.content ?? ACTIVITIES_CONTENT;
  const activityItems = content?.activities.items ?? ACTIVITIES;
  const membershipContent = content?.membership.content ?? MEMBERSHIP_CONTENT;
  const newsContent = content?.news.content ?? NEWS_CONTENT;
  const newsSlots = content?.news.slots ?? [...NEWS_PLACEHOLDERS];
  const newsItems = publicNews.ok ? publicNews.section.items : [];
  const sponsorsContent = content?.sponsors.content ?? SPONSORS_CONTENT;
  const sponsorSlots = content?.sponsors.slots ?? [...SPONSOR_PLACEHOLDERS];

  return (
    <>
      <HeroSection content={hero} />
      <ActivitiesSection content={activitiesContent} items={activityItems} />
      <MembershipSection content={membershipContent} />
      <NewsSection content={newsContent} slots={newsSlots} items={newsItems} />
      <SponsorsSection content={sponsorsContent} slots={sponsorSlots} />
    </>
  );
}
