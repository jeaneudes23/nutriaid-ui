"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Assessment } from "@/features/assessments/assessment-schema";
import { parseDate } from "@/lib/utils";

type Status = "Wasting" | "Stunting" | "Healthy";

// Signed severity: healthy renders above zero, concerns below.
// Wasting is the more acute/severe condition, so it sits deeper than stunting.
const STATUS_SCORE: Record<Status, number> = {
  Healthy: 1,
  Stunting: -1,
  Wasting: -2,
};

const STATUS_COLOR: Record<Status, string> = {
  Wasting: "var(--wasting)",
  Stunting: "var(--stunting)",
  Healthy: "var(--healthy)",
};

const STATUS_LABEL: Record<Status, string> = {
  Wasting: "Wasting (severe)",
  Stunting: "Stunting",
  Healthy: "Healthy",
};

const chartConfig = {
  value: { label: "Status" },
} satisfies ChartConfig;

function isKnownStatus(status: string): status is Status {
  return status in STATUS_SCORE;
}

export function ChildStatusTrendChart({ assessments }: { assessments: Assessment[] }) {
  const chartData = useMemo(
    () =>
      [...assessments]
        .sort((a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime())
        .map((a) => {
          const raw = a.nutritionalStatus;
          const status: Status = isKnownStatus(raw) ? raw : "Healthy";

          if (!isKnownStatus(raw) && process.env.NODE_ENV !== "production") {
            console.warn(
              `[ChildStatusTrendChart] Unrecognized nutritionalStatus "${raw}" — falling back to "Healthy". ` + `Update the Status type/records in this component if this is a valid value.`,
            );
          }

          return {
            date: parseDate(a.measuredAt),
            status,
            value: STATUS_SCORE[status],
          };
        }),
    [assessments],
  );

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status trend</CardTitle>
          <CardDescription>No assessments recorded yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status trend</CardTitle>
        <CardDescription>Healthy assessments above the line, concerns below</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-56">
          <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} interval={0} />
            <YAxis hide domain={[-2.5, 1.5]} />
            <ReferenceLine y={0} stroke="var(--border)" strokeWidth={1} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="date" formatter={(_, __, item) => STATUS_LABEL[item.payload.status as Status]} />} />
            <Bar dataKey="value" radius={4}>
              {chartData.map((item, i) => (
                // eslint-disable-next-line @typescript-eslint/no-deprecated -- Cell is correct here; `shape` breaks negative-value geometry
                <Cell key={`${item.date}-${i}`} fill={STATUS_COLOR[item.status]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="mt-3 flex gap-4 text-xs">
          {(Object.keys(STATUS_LABEL) as Status[]).map((status) => (
            <div key={status} className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: STATUS_COLOR[status] }} />
              <span className="text-muted-foreground">{STATUS_LABEL[status]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
