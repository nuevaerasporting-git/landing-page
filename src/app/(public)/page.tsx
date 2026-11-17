import { HeroBlock } from "@/features/content/components/blocks/HeroBlock";
import { SponsorsBlock } from "@/features/content/components/blocks/SponsorsBlock";
import { MembershipBlock } from "@/features/content/components/blocks/MembershipBlock";
import { NewsBlock } from "@/features/content/components/blocks/NewsBlock";

export default function Home() {
  return (
    <>
      <HeroBlock />
      <SponsorsBlock />
      <MembershipBlock />
      <NewsBlock />
    </>
  );
}