import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { CircleIcon, RulerDimensionLine, RulerDimensionLineIcon, ScaleIcon, WeightIcon } from "lucide-react";
import React from "react";

interface Props {
  params: Promise<{
    childId: string;
  }>;
}

const STATS = [
  {
    title: "Latest weight",
    icon: <WeightIcon className="size-5" />,
    summary: "45th percentile (WHO)",
    value: 14.2,
    unit: "kg",
  },
  {
    title: "Latest height",
    icon: <RulerDimensionLineIcon className="size-5" />,
    summary: "45th percentile (WHO)",
    value: 69,
    unit: "cm",
  },
  {
    title: "Latest MUAC",
    icon: <CircleIcon className="size-5" />,
    summary: "45th percentile (WHO)",
    value: 69,
    unit: "cm",
  },
  {
    title: "Latest BMI",
    icon: <ScaleIcon className="size-5" />,
    summary: "45th percentile (WHO)",
    value: 69,
    unit: "",
  },
];

export default async function page({ params }: Props) {
  const { childId } = await params;
  return (
    <div className="p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="grid gap-1">
          <h2 className="font-heading text-xl font-bold lg:text-2xl">Growth Monitoring</h2>
          <p className="text-muted-foreground">Track physical measurements against WHO standards</p>
        </div>
        <Button>Add measurements</Button>
      </div>
      <hr className="my-6" />
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2 gap-6">
          <Card className="col-span-2 row-span-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <UserAvatar name="Emma Johnson" className="bg-primary/20 size-20 border-none text-center text-3xl font-extrabold" />
                <div className="grid gap-1">
                  <CardTitle className="font-heading text-3xl font-bold">Emma Johnson</CardTitle>
                  <CardDescription>ID: PC_9383_9393</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-primary/10">
            <CardHeader>
              <CardTitle>Age</CardTitle>
              <CardDescription>1y 6m</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-primary/10">
            <CardHeader>
              <CardTitle>Age</CardTitle>
              <CardDescription>1y 6m</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {STATS.map((stat, i) => (
            <div key={i}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm">{stat.title}</span>
                    <span>{stat.icon}</span>
                  </CardTitle>
                  <CardDescription>
                    <span className="font-heading text-foreground text-3xl font-bold">{stat.value}</span>
                    <span className="font-medium"> {stat.unit}</span>
                  </CardDescription>
                  <div className="text-muted-foreground font-medium">{stat.summary}</div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
