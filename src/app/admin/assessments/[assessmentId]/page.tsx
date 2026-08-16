import { EmptyErrorMessage } from "@/components/ErrorMessages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { getAssessment } from "@/features/assessments/assessments-api";
import { getAssessmentStats } from "@/features/assessments/components/GetAssessmentStats";
import { NutritionStatusBadge } from "@/features/children/components/NutritionStatusBadge";
import { getAgeInMonths, parseDate } from "@/lib/utils";
import { CheckIcon, ExternalLinkIcon } from "lucide-react";
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
      <div>
        <h2 className="text-xl font-bold lg:text-2xl">Nutritional Assessment Result</h2>
        <p className="text-muted-foreground">Based on recent measurements recorded on {parseDate(assessment.measuredAt)}</p>
      </div>
      <hr className="my-6" />
      <div className="grid grid-cols-2 gap-8">
        <Card className="">
          <CardHeader className="flex items-center justify-between">
            <div className="group flex items-center gap-2">
              <UserAvatar name={assessment.childId.displayName} className="bg-primary text-primary-foreground text-center" />
              <Link href={`/admin/children/${assessment.childId._id}`}>
                <p className="group-hover:text-primary inline-flex items-center gap-2 font-semibold group-hover:underline">
                  {assessment.childId.displayName} <ExternalLinkIcon className="size-4" />
                </p>
                <p className="text-muted-foreground text-xs font-medium">
                  {assessment.childId.sex}, {`${parseDate(assessment.childId.dateOfBirth)} (${getAgeInMonths(assessment.childId.dateOfBirth)} months)`}
                </p>
              </Link>
            </div>
            <NutritionStatusBadge status={assessment.nutritionalStatus} />
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold">{assessment.insight.title}</h2>
            {assessment.insight.body}
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Calculated metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-xs">
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
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Meal Recommendations</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(assessment.foodRecommendations, null, 2)}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
