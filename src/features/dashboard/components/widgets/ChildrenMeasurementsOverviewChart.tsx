"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Assessment } from "@/features/assessments/assessment-schema";
import { parseDate } from "@/lib/utils";

const chartConfig = {
  weight: { label: "Weight (kg)", color: "var(--primary)" },
  height: { label: "Height (cm)", color: "var(--primary)" },
  muac: { label: "MUAC (cm)", color: "var(--primary)" },
  bmi: { label: "BMI", color: "var(--primary)" },
} satisfies ChartConfig;

type MetricKey = keyof typeof chartConfig;

export function ChildrenMeasurementsOverviewChart({ assessments }: { assessments: Assessment[] }) {
  const [metric, setMetric] = useState<MetricKey>("weight");

  const chartData = useMemo(
    () =>
      [...assessments]
        .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime())
        .map((assessment) => ({
          date: `${assessment.childId.displayName} - ${parseDate(assessment.measuredAt)}`,
          weight: assessment.weightKg,
          height: assessment.heightCm,
          muac: assessment.muacCm,
          bmi: assessment.bmi,
        })),
    [assessments],
  );

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Child Growth trend</CardTitle>
          <CardDescription>No assessments recorded yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <CardTitle>Child Growth trend</CardTitle>
          <CardDescription>
            {chartData[0].date} – {chartData[chartData.length - 1].date}
          </CardDescription>
        </div>
        <div className="flex gap-1 rounded border bg-gray-100 p-1 shadow-xs">
          {(Object.keys(chartConfig) as MetricKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setMetric(key)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${metric === key ? "bg-primary text-primary-foreground" : "hover:bg-muted bg-white"}`}
            >
              {chartConfig[key].label.split(" (")[0]}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-36 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-36"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={metric} fill={`var(--color-${metric})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
