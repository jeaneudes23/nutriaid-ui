import DialogConfirmAction from "@/components/DialogConfirmAction";
import { EmptyErrorMessage } from "@/components/ErrorMessages";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { Assessment } from "@/features/assessments/assessment-schema";
import { getAssessmentStats } from "@/features/assessments/components/GetAssessmentStats";
import { getChild, getChildAssessments } from "@/features/children/children-api";
import { ChildAssessmentsDatatable } from "@/features/children/components/ChildAssessmentsDatatable";
import { ChildGrowthTrendChart } from "@/features/children/components/ChildGrowthTrendChart";
import { ChildStatusTrendChart } from "@/features/children/components/ChildStatusTrendChart";
import { NutritionStatusBadge } from "@/features/children/components/NutritionStatusBadge";
import { cn, getAgeInYearsAndMonths, parseDate } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon, ChartNoAxesCombinedIcon, PlusIcon, TrashIcon } from "lucide-react";
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

  const assessments = await getChildAssessments(childId);

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="grid gap-1">
          <Link href={"/admin/children"} className={cn(buttonVariants({ variant: "ghost", className: "justify-self-start" }))}>
            <ArrowLeftIcon />
            All Children profiles
          </Link>
          {/* <h2 className="text-xl font-bold lg:text-2xl">Growth Monitoring</h2> */}
        </div>
        <DialogConfirmAction
          triggerChildren={
            <span className={cn(buttonVariants({ variant: "destructive", className: "cursor-pointer" }))}>
              <TrashIcon />
              Delete
            </span>
          }
          cardTitle={"Remove Child Profile"}
          cardDescription={"Are you sure you want to permanently delete this child profile?"}
          redirectUrl="/admin/children"
          method="delete"
          apiUrl={`/children/${child._id}`}
        />
      </div>
      <hr className="my-6" />
      <div className="grid gap-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="col-span-full flex items-start gap-4">
            <UserAvatar name={child.displayName} className="bg-primary/10 border-card-foreground/10 size-20 border text-center text-3xl font-extrabold shadow-xs" />
            <div className="grid gap-1 text-sm lg:text-base">
              <div className="font-heading text-base font-bold lg:text-xl">{child.displayName}</div>
              <div>
                <span className="font-semibold">ID:</span> {child.pseudonym}
              </div>
              <div>
                <span className="font-semibold">Date of birth:</span> {parseDate(child.dateOfBirth)} ({getAgeInYearsAndMonths(child.dateOfBirth)})
              </div>
              <div>
                <span className="font-semibold">Gender:</span> {child.sex}
              </div>
            </div>
          </div>
          <Link className={cn(buttonVariants({}))} href={`${child._id}/measure`}>
            <PlusIcon />
            Add measurements
          </Link>
        </div>
        {child.lastAssessment ? (
          <LastAssessment assessment={child.lastAssessment} />
        ) : (
          <Card>
            <EmptyErrorMessage label="No assessments recorded yet" icon={<ChartNoAxesCombinedIcon strokeWidth={1} className="size-16" />} />
          </Card>
        )}
        <ChildStatusTrendChart assessments={assessments.slice(0, 5)} />
        <ChildGrowthTrendChart assessments={assessments.slice(0, 5)} />
        <ChildAssessmentsDatatable assessments={assessments} />
      </div>
    </div>
  );
}

export async function LastAssessment({ assessment }: { assessment: Assessment }) {
  const stats = getAssessmentStats(assessment);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">Last assessment</CardTitle>
          <NutritionStatusBadge className="text-sm [&>svg]:size-4" status={assessment.nutritionalStatus} />
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-primary/5 flex flex-wrap items-center justify-between rounded-md border p-2 text-xs shadow-xs">
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
          <Link className={cn(buttonVariants({ variant: "outline" }), "grow")} href={`/admin/assessments/${assessment._id}`}>
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
          {assessment.foodRecommendations.slice(0, 2).map((foodRecommendation) => (
            <div key={foodRecommendation._id} className="border-primary bg-primary/5 rounded border-l-4 p-2">
              <div className="font-bold capitalize">{foodRecommendation.name}</div>
              <div className="text-muted-foreground line-clamp-1">{foodRecommendation.why}</div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="grid">
          <Link className={cn(buttonVariants({}), "grow")} href={`/admin/assessments/${assessment._id}`}>
            View all recommendations
            <ArrowRightIcon />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
