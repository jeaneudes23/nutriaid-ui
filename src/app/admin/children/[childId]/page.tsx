import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { ChildGrowthTrajectoryChart } from "@/features/children/components/ChildGrowthTrajectoryChart";
import { CircleIcon, RulerDimensionLine, RulerDimensionLineIcon, ScaleIcon, WeightIcon } from "lucide-react";
import Link from "next/link";
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
      <div className="grid gap-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-2 lg:row-span-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <UserAvatar name="Emma Johnson" className="bg-primary/10 border-card-foreground/10 size-20 border text-center text-3xl font-extrabold shadow-xs" />
                <div className="grid gap-1">
                  <CardTitle className="font-heading text-2xl font-bold">Emma Johnson</CardTitle>
                  <CardDescription>ID: PC_9383_9393</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grow grid-cols-2 items-center">
              <div className="bg-primary/10 border-card-foreground/10 rounded-md border px-4 py-2 shadow-xs">
                <div className="grid">
                  <div className="">Age: </div>
                  <div className="text-foreground font-bold">1y 6m</div>
                </div>
              </div>
              <div className="bg-primary/10 border-card-foreground/10 rounded-md border px-4 py-2 shadow-xs">
                <div className="grid">
                  <div className="">Last update: </div>
                  <div className="text-foreground font-bold">Oct 12 2026</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid">
              <Link className={buttonVariants({})} href={`children/${122}/recommendations`}>
                View recommendations
              </Link>
            </CardFooter>
          </Card>
          {STATS.map((stat, i) => (
            <div key={i}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm">{stat.title}</span>
                    <span>{stat.icon}</span>
                  </CardTitle>
                  <CardDescription>
                    <span className="font-heading text-foreground text-xl font-bold">{stat.value}</span>
                    <span className="font-medium"> {stat.unit}</span>
                  </CardDescription>
                  <div className="text-muted-foreground font-medium">{stat.summary}</div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
        <ChildGrowthTrajectoryChart />
      </div>
    </div>
  );
}
