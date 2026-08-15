import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/components/UserAvatar";
import { cn, getAgeInMonths } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getChildren } from "../children-api";

export const ChildrenDataTable = async () => {
  const children = await getChildren();
  return (
    <Table>
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
            <TableCell>{getAgeInMonths(child.dateOfBirth)}</TableCell>
            <TableCell>
              <Badge variant={"secondary"}>{child.status}</Badge>
            </TableCell>
            <TableCell>
              <Link className={cn(buttonVariants({ variant: "outline" }), "text-xs")} href={`/admin/children/${child._id}`}>
                {/* View */}
                <ExternalLinkIcon className="size-4" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
