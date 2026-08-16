import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/components/UserAvatar";
import { cn, parseDate } from "@/lib/utils";
import { ChartNoAxesCombinedIcon, ExternalLinkIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getAssessments } from "../assessments-api";
import { SearchBox } from "@/components/SearchBox";
import { EmptyErrorMessage } from "@/components/ErrorMessages";
import { NutritionStatusBadge } from "@/features/children/components/NutritionStatusBadge";
import DialogConfirmAction from "@/components/DialogConfirmAction";

export const AssessmentsDatatable = async () => {
  const assessments = await getAssessments();
  return (
    <Card>
      <CardHeader className="flex flex-wrap items-center justify-between gap-2">
        <CardTitle>{assessments.length} assessments</CardTitle>
        <div>
          <SearchBox />
        </div>
      </CardHeader>
      <CardContent>
        {assessments.length == 0 ? (
          <EmptyErrorMessage icon={<ChartNoAxesCombinedIcon className="size-16" strokeWidth={1} />} label="No assessments available" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child</TableHead>
                <TableHead>Weight (kgs)</TableHead>
                <TableHead>Height (cm)</TableHead>
                <TableHead>MUAC (cm)</TableHead>
                <TableHead>BMI</TableHead>
                <TableHead>Date measured</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment._id}>
                  <TableCell className="inline-flex items-center gap-2">
                    <UserAvatar name={assessment.childId.displayName} className="bg-primary text-primary-foreground text-center" />
                    {assessment.childId.displayName}
                  </TableCell>
                  <TableCell>{assessment.weightKg}</TableCell>
                  <TableCell>{assessment.heightCm}</TableCell>
                  <TableCell>{assessment.muacCm}</TableCell>
                  <TableCell>{assessment.bmi.toFixed(1)}</TableCell>
                  <TableCell>{parseDate(assessment.measuredAt)}</TableCell>
                  <TableCell>
                    <NutritionStatusBadge
                      showIcon={false}
                      status={assessment.nutritionalStatus}
                      className="flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs text-white [&>svg]:size-3 [&>svg]:shrink-0"
                    />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Link className={cn(buttonVariants({ variant: "outline" }), "text-xs")} href={`assessments/${assessment._id}`}>
                      {/* View */}
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
        )}
      </CardContent>
    </Card>
  );
};
