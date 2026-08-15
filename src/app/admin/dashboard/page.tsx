import { ChildrensWidgets } from "@/features/dashboard/components/widgets/ChildrensWidgets";
import { ClassificationOverviewWidget } from "@/features/dashboard/components/widgets/ClassificationOverviewWidget";
import { RecommendationsWidget } from "@/features/dashboard/components/widgets/RecommendationsWidget";
import { StatsOverviewWidget } from "@/features/dashboard/components/widgets/StatsOverviewWidget";

export default function page() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold lg:text-2xl">Dashboard</h2>
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
