import { Hero } from "@/components/sections/Hero";
import { HomeTabs } from "@/components/sections/HomeTabs";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Subtle gradient background - Konsta style cleaner look */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

      {/* Content */}
      <div className="relative">
        <Hero />
        <HomeTabs />
        <Features />
        <Pricing />
        <FAQ />
      </div>
    </div>
  );
}
