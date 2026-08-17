import { StatWidget } from "@/components/StatWidget";
import { Assessment } from "@/features/assessments/assessment-schema";
import { getAgeInYearsAndMonths } from "@/lib/utils";
import { StatForWidget } from "@/types";
import { CalendarRangeIcon, ChartNoAxesCombinedIcon, ForkKnifeIcon } from "lucide-react";
import React from "react";

export const ChildStatsOverviewWidget = ({ assessments }: { assessments: Assessment[] }) => {
  const stats: StatForWidget[] = [
    {
      title: "Last assessment",
      value: `${getAgeInYearsAndMonths(assessments[0].measuredAt)} ago  `,
      unit: "ago",
      icon: <CalendarRangeIcon />,
    },
    {
      title: "Assessments",
      value: assessments.length,
      icon: <ChartNoAxesCombinedIcon />,
    },
    {
      title: "Meal recommendations",
      value: assessments.reduce((acc, a) => (acc += a.foodRecommendations.length), 0),
      icon: <ForkKnifeIcon />,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
      {stats.map((stat, i) => (
        <StatWidget key={i} stat={stat} />
      ))}
    </div>
  );
};
