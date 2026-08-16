"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Assessment } from "@/features/assessments/assessment-schema";
import { parseDate } from "@/lib/utils";

const chartConfig = {
  weight: { label: "Weight (kg)", color: "var(--weight)" },
  height: { label: "Height (cm)", color: "var(--height)" },
  muac: { label: "MUAC (cm)", color: "var(--muac)" },
  bmi: { label: "BMI", color: "var(--bmi)" },
} satisfies ChartConfig;

type MetricKey = keyof typeof chartConfig;

export function ChildGrowthMetricsComparisonChart({ assessments }: { assessments: Assessment[] }) {
  const [metric, setMetric] = useState<MetricKey>("weight");

  const chartData = useMemo(
    () =>
      [...assessments]
        .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime())
        .map((assessment) => ({
          date: parseDate(assessment.measuredAt),
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
          <CardTitle>Growth metrics</CardTitle>
          <CardDescription>No assessments recorded yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Growth metrics</CardTitle>
          <CardDescription>
            {chartData[0].date} – {chartData[chartData.length - 1].date}
          </CardDescription>
        </div>
        <div className="flex gap-1">
          {(Object.keys(chartConfig) as MetricKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setMetric(key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${metric === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              {chartConfig[key].label.split(" (")[0]}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-64">
          <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} interval={0} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey={metric} fill={`var(--color-${metric})`} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
