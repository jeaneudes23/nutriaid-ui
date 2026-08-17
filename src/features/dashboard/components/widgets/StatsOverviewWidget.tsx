import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BabyIcon, ChartNoAxesCombinedIcon, ForkKnifeIcon } from "lucide-react";

export const StatsOverviewWidget = ({ values }: { values: { children: number; assessments: number; foodRecommendations: number } }) => {
  const STATS = [
    {
      icon: <BabyIcon className="size-5" />,
      title: "Children profiles",
      value: values.children,
    },
    {
      icon: <ChartNoAxesCombinedIcon className="size-5" />,
      title: "Assessments completed",
      value: values.assessments,
    },
    {
      icon: <ForkKnifeIcon className="size-5" />,
      title: "Meals recommended",
      value: values.foodRecommendations,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
      {STATS.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardTitle className="text-muted-foreground text-sm font-medium">{stat.title}</CardTitle>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
