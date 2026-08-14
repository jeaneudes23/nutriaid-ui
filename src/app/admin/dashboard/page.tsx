import { ChildrensWidgets } from "@/features/dashboard/components/widgets/ChildrensWidgets";
import { ClassificationOverviewWidget } from "@/features/dashboard/components/widgets/ClassificationOverviewWidget";
import { RecommendationsWidget } from "@/features/dashboard/components/widgets/RecommendationsWidget";
import { StatsOverviewWidget } from "@/features/dashboard/components/widgets/StatsOverviewWidget";

export default function page() {
  return (
    <div className="p-6">
      <h2 className="font-heading text-4xl font-bold">Dashboard</h2>
      <hr className="my-6" />
      <div className="grid gap-8">
        <StatsOverviewWidget />
        <div className="grid gap-8 lg:grid-cols-2">
          <ClassificationOverviewWidget />
          <RecommendationsWidget />
        </div>
        <ChildrensWidgets />
      </div>
    </div>
  );
}
