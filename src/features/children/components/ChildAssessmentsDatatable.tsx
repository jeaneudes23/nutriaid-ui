import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, parseDate } from "@/lib/utils";
import { ExternalLinkIcon, RulerDimensionLineIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { getChildAssessments } from "../children-api";

export const ChildAssessmentsDatatable = async ({ childId }: { childId: string }) => {
  const assessments = await getChildAssessments(childId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RulerDimensionLineIcon className="text-primary" />
          Assessment history
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Height (cm)</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>MUAC (cm)</TableHead>
              <TableHead>Age (months)</TableHead>
              <TableHead>Date measured</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment._id}>
                <TableCell>{assessment.weightKg}</TableCell>
                <TableCell>{assessment.heightCm}</TableCell>
                <TableCell>{assessment.muacCm}</TableCell>
                <TableCell>{assessment.ageMonthsAtMeasurement}</TableCell>
                <TableCell>{parseDate(assessment.measuredAt)}</TableCell>
                <TableCell className="flex gap-2">
                  <Link href={`/admin/assessments/${assessment._id}`} className={cn(buttonVariants({ variant: "outline" }))}>
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                  <Button variant={"outline"}>
                    <TrashIcon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
