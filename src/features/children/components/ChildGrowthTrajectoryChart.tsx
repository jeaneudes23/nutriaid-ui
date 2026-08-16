"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export const description = "A multiple line chart";

const chartData = [
  { month: "January", whoUpperLimitAtAge: 14.2, whoLowerLimitAtAge: 11.0, current: 10.5 },
  { month: "February", whoUpperLimitAtAge: 14.2, whoLowerLimitAtAge: 11.0, current: 13.7 },
];

const chartConfig = {
  whoUpperLimitAtAge: {
    label: "Upper limit",
    color: "var(--healthy)",
  },
  whoLowerLimitAtAge: {
    label: "Lower limit",
    color: "var(--healthy)",
  },
  current: {
    label: "Current",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChildGrowthTrajectoryChart() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">Child growth trajectory</CardTitle>
        <div className="font-heading flex items-center gap-1 rounded-md border bg-gray-100 p-1 shadow-xs">
          <button className={cn("bg-background text-primary rounded px-2 py-1 text-xs font-medium")}>Weight</button>
          <button className={cn("rounded px-2 py-1 text-xs font-medium")}>Height</button>
          <button className={cn("rounded px-2 py-1 text-xs font-medium")}>BMI</button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-64">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="whoUpperLimitAtAge" type="monotone" stroke="var(--color-whoUpperLimitAtAge)" strokeWidth={2} dot={false} />
            <Line dataKey="whoLowerLimitAtAge" type="monotone" stroke="var(--color-whoLowerLimitAtAge)" strokeWidth={2} dot={false} />
            <Line dataKey="current" type="monotone" stroke="var(--color-current)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-1">
          <span style={{ backgroundColor: "var(--primary)" }} className="size-4 rounded-full"></span>
          <span className="text-muted-foreground text-sm font-medium">Child&apos;s measurements</span>
        </div>
        <div className="flex items-center gap-1">
          <span style={{ backgroundColor: "var(--healthy)" }} className="size-4 rounded-full"></span>
          <span className="text-muted-foreground text-sm font-medium">WHO limits at age</span>
        </div>
      </CardFooter>
    </Card>
  );
}
