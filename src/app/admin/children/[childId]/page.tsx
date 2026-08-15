import { EmptyErrorMessage } from "@/components/ErrorMessages";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { getChild } from "@/features/children/children-api";
import { ChildWithAssessment } from "@/features/children/children-schema";
import { ChildAssessmentsDatatable } from "@/features/children/components/ChildAssessmentsDatatable";
import { ChildGrowthTrajectoryChart } from "@/features/children/components/ChildGrowthTrajectoryChart";
import { cn, getAgeInMonths, parseDate } from "@/lib/utils";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChartNoAxesCombinedIcon,
  CircleIcon,
  ListTodoIcon,
  PlusIcon,
  RulerDimensionLine,
  RulerDimensionLineIcon,
  ScaleIcon,
  ThumbsUpIcon,
  WeightIcon,
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    childId: string;
  }>;
}

export default async function page({ params }: Props) {
  const { childId } = await params;
  const child = await getChild(childId);
  if (!child)
    return (
      <div className="p-8 pt-20">
        <EmptyErrorMessage />
      </div>
    );

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
        <ChildHeaderAndLastAssessment child={child} />
        <ChildGrowthTrajectoryChart />
        <ChildAssessmentsDatatable childId={child._id} />
      </div>
    </div>
  );
}

export async function ChildHeaderAndLastAssessment({ child }: { child: ChildWithAssessment }) {
  const STATS = [
    {
      title: "Age",
      icon: <CalendarIcon className="size-4" />,
      value: child.lastAssessment.ageMonthsAtMeasurement,
      unit: "months",
    },
    {
      title: "Measured at",
      icon: <CalendarIcon className="size-4" />,
      value: parseDate(child.dateOfBirth),
      unit: "",
    },
    {
      title: "Weight",
      icon: <WeightIcon className="size-4" />,
      value: child.lastAssessment.weightKg,
      unit: "kg",
    },
    {
      title: "Latest height",
      icon: <RulerDimensionLineIcon className="size-4" />,
      value: child.lastAssessment.heightCm,
      unit: "cm",
    },
    {
      title: "Latest MUAC",
      icon: <CircleIcon className="size-4" />,
      value: child.lastAssessment.muacCm,
      unit: "cm",
    },
    {
      title: "Latest BMI",
      icon: <ScaleIcon className="size-4" />,
      value: child.lastAssessment.bmi.toFixed(1),
      unit: "",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-full flex items-start gap-4">
        <UserAvatar name={child.displayName} className="bg-primary/10 border-card-foreground/10 size-20 border text-center text-3xl font-extrabold shadow-xs" />
        <div className="grid gap-1">
          <div className="font-heading text-2xl font-bold">{child.displayName}</div>
          <div>
            <span className="font-semibold">ID:</span> {child.pseudonym}
          </div>
          <div>
            <span className="font-semibold">Date of birth:</span> {} ({getAgeInMonths(child.dateOfBirth)})
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {child.sex}
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Last assessment</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-primary/5 flex flex-wrap items-center justify-between rounded-md border p-2 text-sm shadow-xs">
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
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Food recommendations</CardTitle>
        </CardHeader>
        <CardContent className="grow">
          {child.lastAssessment.foodRecommendations.slice(0, 2).map((foodRecommendation) => (
            <div key={foodRecommendation._id} className="border-primary bg-primary/5 rounded border-l-4 p-2 text-sm">
              <div className="font-bold capitalize">{foodRecommendation.ingredients}</div>
              <div className="text-muted-foreground">{foodRecommendation.howToPrepare}</div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="grid">
          <Link className={cn(buttonVariants({}), "grow")} href={`/admin/assessments/${child.lastAssessment._id}`}>
            View all recommendations
            <ArrowRightIcon />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
