import { EmptyErrorMessage } from "@/components/ErrorMessages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { getAssessment } from "@/features/assessments/assessments-api";
import { getAgeInMonths, parseDate } from "@/lib/utils";
import { CheckIcon, CircleIcon, ExternalLinkIcon, MoveVerticalIcon, PersonStandingIcon, WeightIcon } from "lucide-react";
import Link from "next/link";

const STATS = [
  {
    title: "Weight",
    icon: <WeightIcon className="size-5" />,
    value: 14.2,
    unit: "kg",
  },
  {
    title: "Height",
    icon: <MoveVerticalIcon className="size-5" />,
    value: 69,
    unit: "cm",
  },
  {
    title: "Latest MUAC",
    icon: <CircleIcon className="size-5" />,
    value: 69,
    unit: "cm",
  },
  {
    title: "Latest BMI",
    icon: <PersonStandingIcon className="size-5" />,
    value: 69,
    unit: "",
  },
];

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
  return (
    <div className="p-8">
      <div>
        <h2 className="text-xl font-bold lg:text-2xl">Nutritional Assessment Result</h2>
        <p className="text-muted-foreground">Based on recent measurements recorded on {parseDate(assessment.measuredAt)}</p>
      </div>
      <hr className="my-6" />
      <div className="grid grid-cols-3 gap-8">
        <Card className="col-span-2">
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
            <div className="bg-primary/10 text-primary border-primary inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm font-bold">
              <CheckIcon />
              {assessment.nutritionalStatus}
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold">{assessment.insight.title}</h2>
            {assessment.insight.body}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calculated metrics</CardTitle>
          </CardHeader>
          <CardContent>
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
      </div>
    </div>
  );
}
