"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Child } from "@/features/children/children-schema";

export function ClassificationOverviewWidget({ children_p }: { children_p: Child[] }) {
  type Status = "Wasting" | "Stunting" | "Healthy";

  const categoriesCount = children_p.reduce<Record<Status, number>>(
    (acc, a) => {
      const status = a.status as Status;
      acc[status] = (acc[status] ?? 0) + 1;
      return acc;
    },
    { Wasting: 0, Stunting: 0, Healthy: 0 },
  );

  const chartData = React.useMemo(
    () =>
      (Object.keys(categoriesCount) as Status[]).map((status) => ({
        category: status,
        children: categoriesCount[status],
        fill: `var(--${status.toLocaleLowerCase()})`,
      })),
    [categoriesCount],
  );

  const chartConfig = {
    Stunting: {
      label: "Stunting",
      color: "var(--stunting)",
    },
    Wasting: {
      label: "Wasting",
      color: "var(--wasting)",
    },
    Healthy: {
      label: "Healthy",
      color: "var(--healthy)",
    },
  } satisfies ChartConfig;

  const totalChildren = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.children, 0);
  }, [chartData]);

  if (totalChildren === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No child profiles available</CardTitle>
        </CardHeader>
      </Card>
    );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Classification summary</CardTitle>
        <CardDescription>Distribution of nutritional status among children</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="children" nameKey="category" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalChildren.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Children
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center gap-4">
          {chartData.map((data, i) => (
            <div key={i} className="flex items-center gap-1">
              <span style={{ backgroundColor: chartConfig[data.category as keyof typeof chartConfig].color }} className={`size-4 rounded-full`}></span>
              <span className="text-muted-foreground capitalize">{data.category}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
