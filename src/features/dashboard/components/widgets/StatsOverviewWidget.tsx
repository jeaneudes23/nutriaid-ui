import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BabyIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import React from "react";

const STATS = [
  {
    icon: <BabyIcon className="size-4" />,
    title: "Total children tracked",
    value: 20,
    summary: "Children",
    trend: "net",
  },
  {
    icon: <TrendingUpIcon className="size-4" />,
    title: "Currently",
    value: 20,
    summary: "On track",
    trend: "up",
  },
  {
    icon: <TrendingDownIcon className="size-4" />,
    title: "Attention needed",
    value: 20,
    summary: "Off track",
    trend: "down",
  },
];
export const StatsOverviewWidget = () => {
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {STATS.map((stat, i) => (
          <Card key={i} className="pb-0">
            <CardHeader>
              <CardTitle className="text-muted-foreground text-sm">{stat.title}</CardTitle>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={cn("flex items-center gap-2", stat.trend == "up" ? "text-green-600" : stat.trend == "down" ? "text-destructive" : "text-yellow-600")}>
                {stat.summary} {stat.icon}
              </div>
            </CardHeader>
            <CardFooter
              className={cn("border-t-2 pt-4", stat.trend == "up" ? "border-green-600 bg-green-600/10" : stat.trend == "down" ? "border-red-600 bg-red-600/10" : "border-yellow-600 bg-yellow-600/10")}
            ></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
