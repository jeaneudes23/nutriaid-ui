import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, parseDate } from "@/lib/utils";
import { ExternalLinkIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import DialogConfirmAction from "@/components/DialogConfirmAction";
import { Assessment } from "@/features/assessments/assessment-schema";
import { NutritionStatusBadge } from "./NutritionStatusBadge";

export const ChildAssessmentsDatatable = ({ assessments }: { assessments: Assessment[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Assessment history</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="min-w-2xl">
          <TableHeader>
            <TableRow>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>Height (cm)</TableHead>
              <TableHead>MUAC (cm)</TableHead>
              <TableHead>BMI</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell>{assessment.bmi.toFixed(2)}</TableCell>
                <TableCell>
                  <NutritionStatusBadge
                    showIcon={false}
                    status={assessment.nutritionalStatus}
                    className="flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs text-white [&>svg]:size-3 [&>svg]:shrink-0"
                  />
                </TableCell>
                <TableCell>{parseDate(assessment.measuredAt)}</TableCell>
                <TableCell className="flex gap-2">
                  <Link href={`/admin/assessments/${assessment._id}`} className={cn(buttonVariants({ variant: "outline" }))}>
                    <ExternalLinkIcon className="size-4" />
                  </Link>
                  <DialogConfirmAction
                    triggerChildren={
                      <span className={cn(buttonVariants({ variant: "destructive", className: "cursor-pointer" }))}>
                        <TrashIcon />
                      </span>
                    }
                    cardTitle={"Delete Assessment"}
                    cardDescription={"Are you sure you want to delete this assessment?"}

                    method="delete"
                    apiUrl={`/assessments/${assessment._id}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
