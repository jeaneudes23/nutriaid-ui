import { getAssessments } from "@/features/assessments/assessments-api";
import { getChildren } from "@/features/children/children-api";
import { ChildrenMeasurementsOverviewChart } from "@/features/dashboard/components/widgets/ChildrenMeasurementsOverviewChart";
import { ChildrenTableWidget } from "@/features/dashboard/components/widgets/ChildrenTableWidget";
import { ClassificationOverviewWidget } from "@/features/dashboard/components/widgets/ClassificationOverviewWidget";
import { RecentAssessmentWidget } from "@/features/dashboard/components/widgets/RecentAssessmentWidget";
import { StatsOverviewWidget } from "@/features/dashboard/components/widgets/StatsOverviewWidget";

export default async function page() {
  const children = await getChildren();
  const assessments = await getAssessments();
  const foodRecommendations = assessments.reduce((acc, a) => (acc += a.foodRecommendations.length), 0);

  const values = {
    children: children.length,
    assessments: assessments.length,
    foodRecommendations,
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold lg:text-2xl">Dashboard</h2>
      <hr className="my-6" />
      <div className="grid gap-8">
        <StatsOverviewWidget values={values} />
        <ChildrenMeasurementsOverviewChart />
        <div className="grid gap-8 lg:grid-cols-2">
          <ClassificationOverviewWidget children_p={children} />
          <RecentAssessmentWidget assessments={assessments.slice(0, 3)} />
        </div>
        <ChildrenTableWidget />
      </div>
    </div>
  );
}
