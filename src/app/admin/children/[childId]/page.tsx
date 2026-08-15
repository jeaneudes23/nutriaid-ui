import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { getChild } from "@/features/children/children-api";
import { ChildGrowthTrajectoryChart } from "@/features/children/components/ChildGrowthTrajectoryChart";
import { ChilMeasurementHistoryDataTable } from "@/features/children/components/ChildMeasurementHistoryDataTable";
import { cn, getAgeInMonths, parseDate } from "@/lib/utils";
import { ArrowRightIcon, ChartNoAxesCombinedIcon, CircleIcon, ListTodoIcon, PlusIcon, RulerDimensionLine, RulerDimensionLineIcon, ScaleIcon, ThumbsUpIcon, WeightIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    childId: string;
  }>;
}

export default async function page({ params }: Props) {
  const { childId } = await params;
  const child = await getChild(childId);
  if (!child) return <div>Not found</div>;

  const STATS = [
    {
      title: "Weight",
      icon: <WeightIcon className="size-5" />,
      value: child.lastAssessment.weightKg,
      unit: "kg",
    },
    {
      title: "Latest height",
      icon: <RulerDimensionLineIcon className="size-5" />,
      value: child.lastAssessment.heightCm,
      unit: "cm",
    },
    {
      title: "Latest MUAC",
      icon: <CircleIcon className="size-5" />,
      value: child.lastAssessment.muacCm,
      unit: "cm",
    },
    {
      title: "Latest BMI",
      icon: <ScaleIcon className="size-5" />,
      value: child.lastAssessment.bmi,
      unit: "",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h2 className="text-xl font-bold lg:text-2xl">Growth Monitoring</h2>
          <p className="text-muted-foreground">Track physical measurements against WHO standards</p>
        </div>
        <Link className={buttonVariants({})} href={`${child._id}/measure`}>
          <PlusIcon />
          Add measurements
        </Link>
      </div>
      <hr className="my-6" />
      <div className="grid gap-8">
        <div className="col-span-full flex items-start gap-4">
          <UserAvatar name={child.displayName} className="bg-primary/10 border-card-foreground/10 size-20 border text-center text-3xl font-extrabold shadow-xs" />
          <div className="grid gap-1">
            <div className="font-heading text-2xl font-bold">{child.displayName}</div>
            <div>
              <span className="font-semibold">ID:</span> {child.pseudonym}
            </div>
            <div>
              <span className="font-semibold">Date of birth:</span> {parseDate(child.dateOfBirth)} ({getAgeInMonths(child.dateOfBirth)})
            </div>
            <div>
              <span className="font-semibold">Gender:</span> {child.sex}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ChartNoAxesCombinedIcon className="text-primary" /> Last assessment
              </CardTitle>
              <div>{child.lastAssessment.nutritionalStatus}</div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {STATS.map((stat, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border bg-gray-100 p-3 shadow-xs">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-primary">{stat.icon}</span>
                    <span className="font-medium">{stat.title}</span>
                  </span>
                  <span className="text-primary inline-flex items-center font-medium">
                    {stat.value} {stat.unit}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link className={cn(buttonVariants({ variant: "outline" }), "grow")} href={`/admin/assessments/${child.lastAssessment._id}`}>
                View assessment
                <ArrowRightIcon />
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUpIcon className="text-primary" /> Recent recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {STATS.map((stat, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border bg-gray-100 p-3 shadow-xs">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-primary">{stat.icon}</span>
                    <span className="font-medium">{stat.title}</span>
                  </span>
                  <span className="text-primary inline-flex items-center font-medium">
                    {stat.value} {stat.unit}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link className={cn(buttonVariants({}), "grow")} href={`/admin/assessments/${122}`}>
                View recommendations
                <ArrowRightIcon />
              </Link>
            </CardFooter>
          </Card>
        </div>
        <ChildGrowthTrajectoryChart />
        <ChilMeasurementHistoryDataTable />
      </div>
    </div>
  );
}
