import { cn } from "@/lib/utils";
import { TrendingUpIcon, UtensilsIcon } from "lucide-react";

const FEATURES = [
  {
    icon: (
      <span className="bg-primary inline-flex rounded-xl p-3 text-white">
        <UtensilsIcon />
      </span>
    ),
    title: "Personalized Meal Plans",
    summary: "Age-appropriate textures, allergen introduction schedules, and macro-nutrient balanced recipes tailored to your child's specific developmental window.",
  },
  {
    icon: (
      <span className="inline-flex rounded-xl bg-yellow-600 p-3 text-white">
        <TrendingUpIcon />
      </span>
    ),
    title: "Growth Monitoring",
    summary: "Track weight, height, and BMI against WHO standard percentiles.",
  },
  {
    icon: (
      <span className="inline-flex rounded-xl bg-green-600 p-3 text-white">
        <UtensilsIcon />
      </span>
    ),
    title: "Clinical Sources",
    summary: "All guidelines are continuously updated based on American Academy of Pediatrics (AAP) and WHO recommendations.",
  },
  {
    icon: (
      <span className="inline-flex rounded-xl bg-red-700 p-3 text-white">
        <UtensilsIcon />
      </span>
    ),
    title: "Smart Allergen Alerts",
    summary: "Guided, evidence-based protocols for introducing common allergens (like peanuts and dairy) safely, with symptom tracking and immediate guidance on when to seek medical care.",
  },
];
export const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container grid gap-12">
        <div className="grid gap-4 text-center">
          <h2 className="font-primary font-heading text-4xl font-bold">Comprehensive Tools</h2>
          <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit, necessitatibus?</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <div key={i} className={cn(i == 0 || i == 3 ? "md:col-span-2" : "", "bg-background grid content-start gap-3 rounded-xl border p-8 shadow")}>
              <span>{feature.icon}</span>
              <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
              <p className="max-w-md text-sm text-gray-600">{feature.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
