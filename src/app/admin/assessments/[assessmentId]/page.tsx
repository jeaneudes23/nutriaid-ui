import DialogConfirmAction from "@/components/DialogConfirmAction";
import { EmptyErrorMessage } from "@/components/ErrorMessages";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { getAssessment } from "@/features/assessments/assessments-api";
import { getAssessmentStats } from "@/features/assessments/components/GetAssessmentStats";
import { MealRecommendation } from "@/features/assessments/components/MealRecommendation";
import { ChildCard } from "@/features/children/components/ChildCard";
import { NutritionStatusBadge } from "@/features/children/components/NutritionStatusBadge";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    assessmentId: string;
  }>;
}
export default async function page({ params }: Props) {
  const { assessmentId } = await params;
  const assessment = await getAssessment(assessmentId);
  if (!assessment)
    return (
      <div className="p-8 pt-20">
        <EmptyErrorMessage />
      </div>
    );

  const STATS = getAssessmentStats(assessment);
  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="grid gap-1">
          <Link href={`/admin/children/${assessment.childId._id}`} className={buttonVariants({ variant: "ghost", className: "justify-self-start" })}>
            <ArrowLeftIcon />
            View child profile
          </Link>
        </div>
        <DialogConfirmAction
          triggerChildren={
            <span className={cn(buttonVariants({ variant: "destructive", className: "cursor-pointer" }))}>
              <TrashIcon />
              Delete
            </span>
          }
          cardTitle={"Delete Assessment"}
          cardDescription={"Are you sure you want to delete this assessment?"}
          redirectUrl="/admin/assessments"
          method="delete"
          apiUrl={`/assessments/${assessment._id}`}
        />
      </div>
      <hr className="my-6" />
      <div className="grid gap-8">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <ChildCard child={assessment.childId} />
            <NutritionStatusBadge status={assessment.nutritionalStatus} />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
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
            </div>
          </CardContent>
          <CardFooter className="grid gap-2">
            <h3 className="text-lg font-bold">{assessment.insight.title}</h3>
            <p className="max-w-3xl text-balance">{assessment.insight.body}</p>
          </CardFooter>
        </Card>

        <section id="recommendations" className="col-span-full grid gap-6">
          <div>
            <h2 className="text-lg font-bold lg:text-2xl">Meal Recommendations</h2>
            <CardDescription></CardDescription>
          </div>
          <div className="grid gap-4 text-sm">
            {assessment.foodRecommendations.map((meal) => (
              <MealRecommendation meal={meal} key={meal._id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
