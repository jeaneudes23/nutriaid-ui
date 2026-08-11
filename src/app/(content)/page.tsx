import { CtaSection } from "@/components/features/homepage/CtaSection";
import { FeaturesSection } from "@/components/features/homepage/FeaturesSection";
import { HeroSection } from "@/components/features/homepage/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="from-primary/5 bg-linear-to-t">
        <FeaturesSection />
        <CtaSection />
      </div>
    </main>
  );
}
