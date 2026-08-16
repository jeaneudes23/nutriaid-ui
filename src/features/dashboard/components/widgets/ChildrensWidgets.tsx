import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/components/UserAvatar";
import { getChildren } from "@/features/children/children-api";
import { NutritionStatusBadge } from "@/features/children/components/NutritionStatusBadge";
import { cn, getAgeInMonths } from "@/lib/utils";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export const ChildrensWidgets = async () => {
  const children = await getChildren(10);

  return (
    <Card className="grid gap-6">
      <CardHeader className="flex justify-between">
        <CardTitle>Children Profiles</CardTitle>
        <Link href={`/admin/children`} className={cn(buttonVariants({ variant: "outline" }))}>
          View All
          <ArrowRightIcon />
        </Link>
      </CardHeader>
      <CardContent className="grid">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {children.map((child) => (
              <TableRow key={child._id}>
                <TableCell className="inline-flex items-center gap-2">
                  <UserAvatar name={child.displayName} className="bg-primary text-primary-foreground text-center" />
                  {child.displayName}
                </TableCell>
                <TableCell>{getAgeInMonths(child.dateOfBirth)}</TableCell>
                <TableCell className="w-fit">
                  <NutritionStatusBadge showIcon={false} status={child.status} className="flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs text-white [&>svg]:size-3 [&>svg]:shrink-0" />
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Link className={cn(buttonVariants({ variant: "outline" }))} href={`/admin/children/${child._id}`}>
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
  );
};
