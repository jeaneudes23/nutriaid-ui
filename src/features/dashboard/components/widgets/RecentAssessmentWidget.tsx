import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Assessment } from "@/features/assessments/assessment-schema";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const RecentAssessmentWidget = ({ assessments }: { assessments: Assessment[] }) => {
  if (assessments.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No assessments recorded yet</CardTitle>
        </CardHeader>
      </Card>
    );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent assessments</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        {assessments.map((a, i) => (
          <Link style={{ borderColor: `var(--${a.nutritionalStatus.toLocaleLowerCase()})` }} href={`/admin/assessments/${a._id}`} key={i} className="bg-primary/5 rounded border-l-4 p-4">
            <p className="font-bold">{a.childId.displayName}</p>
            <p className="text-muted-foreground line-clamp-1 text-sm">{a.insight.title}</p>
          </Link>
        ))}
      </CardContent>
      <CardFooter className="grid">
        <Link href={"/admin/assessments"} className={cn(buttonVariants({ variant: "outline" }))}>
          View all assessments
          <ArrowRightIcon />
        </Link>
      </CardFooter>
    </Card>
  );
};
