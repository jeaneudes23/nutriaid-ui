"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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

export function ChildMeasurementsTrendChart({ assessments }: { assessments: Assessment[] }) {
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
          <CardTitle>Child Growth trend</CardTitle>
          <CardDescription>No assessments recorded yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Child Growth trend</CardTitle>
          <CardDescription>
            {chartData[0].date} – {chartData[chartData.length - 1].date}
          </CardDescription>
        </div>
        <div className="flex gap-1 rounded-md border bg-gray-100 p-1 shadow-xs">
          {(Object.keys(chartConfig) as MetricKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setMetric(key)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${metric === key ? "bg-primary text-primary-foreground" : "hover:bg-muted bg-white"}`}
            >
              {chartConfig[key].label.split(" (")[0]}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-64">
          <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey={metric} type="monotone" stroke={`var(--color-${metric})`} strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
