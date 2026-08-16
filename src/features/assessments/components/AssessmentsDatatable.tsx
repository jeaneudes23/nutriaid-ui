import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/components/UserAvatar";
import { cn, parseDate } from "@/lib/utils";
import { ChartNoAxesCombinedIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getAssessments } from "../assessments-api";
import { SearchBox } from "@/components/SearchBox";
import { EmptyErrorMessage } from "@/components/ErrorMessages";

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
          <EmptyErrorMessage icon={<ChartNoAxesCombinedIcon className="size-16" strokeWidth={1} />} label="No child profiles available" />
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
                    <Badge variant={"destructive"}>{assessment.nutritionalStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <Link className={cn(buttonVariants({ variant: "outline" }), "text-xs")} href={`assessments/${assessment._id}`}>
                      {/* View */}
                      <ExternalLinkIcon className="size-4" />
                    </Link>
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
