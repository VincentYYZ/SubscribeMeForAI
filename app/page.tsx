import { Hero } from "@/components/sections/Hero";
import { HomeTabs } from "@/components/sections/HomeTabs";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HomeTabs />
      <Features />
      <Pricing />
      <FAQ />
    </div>
  );
}
