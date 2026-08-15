"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", median: 14.2, current: 13.5 },
  { month: "February", median: 14.2, current: 13.7 },
  { month: "March", median: 14.2, current: 14.0 },
  { month: "April", median: 14.2, current: 14.1 },
  { month: "May", median: 14.2, current: 14.3 },
  { month: "June", median: 14.2, current: 14.5 },
];

const chartConfig = {
  median: {
    label: "Median",
    color: "var(--chart-1)",
  },
  current: {
    label: "Current",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChildGrowthTrajectoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Child growth trajectory</CardTitle>
        <div></div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="median" type="monotone" stroke="var(--color-median)" strokeWidth={2} dot={false} />
            <Line dataKey="current" type="monotone" stroke="var(--color-current)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">Showing total visitors for the last 6 months</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
