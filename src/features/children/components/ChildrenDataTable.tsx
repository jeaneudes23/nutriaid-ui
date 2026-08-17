import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/components/UserAvatar";
import { cn, getAgeInYearsAndMonths } from "@/lib/utils";
import { BabyIcon, ExternalLinkIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { getChildren } from "../children-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyErrorMessage } from "@/components/ErrorMessages";
import { SearchBox } from "@/components/SearchBox";
import DialogConfirmAction from "@/components/DialogConfirmAction";
import { NutritionStatusBadge } from "./NutritionStatusBadge";

export const ChildrenDataTable = async () => {
  const children = await getChildren();
  return (
    <Card>
      <CardHeader className="flex flex-wrap items-center justify-between gap-2">
        <CardTitle>{children.length} profiles</CardTitle>
        <div>
          <SearchBox />
        </div>
      </CardHeader>
      <CardContent>
        {children.length == 0 ? (
          <EmptyErrorMessage icon={<BabyIcon className="size-16" strokeWidth={1} />} label="No child profiles available" />
        ) : (
          <Table className="min-w-2xl">
            <TableHeader>
              <TableRow>
                <TableHead>Full name</TableHead>
                <TableHead>Gender</TableHead>
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
                  <TableCell>
                    <Badge variant={"secondary"}>{child.sex}</Badge>
                  </TableCell>
                  <TableCell>{getAgeInYearsAndMonths(child.dateOfBirth)}</TableCell>
                  <TableCell className="w-fit">
                    <NutritionStatusBadge
                      showIcon={false}
                      status={child.status}
                      className="flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs text-white [&>svg]:size-3 [&>svg]:shrink-0"
                    />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Link className={cn(buttonVariants({ variant: "outline" }))} href={`/admin/children/${child._id}`}>
                      {/* View */}
                      <ExternalLinkIcon className="size-4" />
                    </Link>
                    <DialogConfirmAction
                      triggerChildren={
                        <span className={cn(buttonVariants({ variant: "destructive", className: "cursor-pointer" }))}>
                          <TrashIcon />
                        </span>
                      }
                      cardTitle={"Remove Child Profile"}
                      cardDescription={"Are you sure you want to permanently delete this child profile?"}

                      method="delete"
                      apiUrl={`/children/${child._id}`}
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
