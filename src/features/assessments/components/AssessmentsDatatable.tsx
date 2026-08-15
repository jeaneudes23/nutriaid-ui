import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getAssessments } from "../assessments-api";

export const AssessmentsDatatable = async () => {
  const data = await getAssessments();

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child</TableHead>
                <TableHead>Date measured</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }, (_, i) => (
                <TableRow key={i}>
                  <TableCell className="inline-flex items-center gap-2">
                    <UserAvatar name="Jackie Smith" className="bg-primary text-primary-foreground text-center" />
                    Jackie smith
                  </TableCell>
                  <TableCell>20/7/2024</TableCell>
                  <TableCell>
                    <Badge variant={"destructive"}>Healthy</Badge>
                  </TableCell>
                  <TableCell>
                    <Link className={cn(buttonVariants({ variant: "outline" }), "text-xs")} href={`assessments/${`iidiii`}`}>
                      {/* View */}
                      <ExternalLinkIcon className="size-4" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
