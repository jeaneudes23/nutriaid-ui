import { CtaSection } from "@/features/homepage/CtaSection";
import { FeaturesSection } from "@/features/homepage/FeaturesSection";
import { HeroSection } from "@/features/homepage/HeroSection";

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
