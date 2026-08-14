"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const chartData = [
  { category: "stunting", children: 275, fill: "var(--color-stunting)" },
  { category: "wasting", children: 200, fill: "var(--color-wasting)" },
  { category: "healthy", children: 287, fill: "var(--color-healthy)" },
];

const chartConfig = {
  stunting: {
    label: "Stunting",
    color: "var(--stunting)",
  },
  wasting: {
    label: "Wasting",
    color: "var(--wasting)",
  },
  healthy: {
    label: "Healthy",
    color: "var(--healthy)",
  },
} satisfies ChartConfig;

export function ClassificationOverviewWidget() {
  const totalChildren = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.children, 0);
  }, []);

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
              <span style={{ backgroundColor: chartConfig[data.category as keyof typeof chartConfig].color }} className={`size-3`}></span>
              <span className="text-muted-foreground text-xs capitalize">{data.category}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
