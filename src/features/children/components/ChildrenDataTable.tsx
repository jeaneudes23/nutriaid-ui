import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ChildrenDataTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Full name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last measurement</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>Jackie smith</TableCell>
            <TableCell>1y 2m</TableCell>
            <TableCell>
              <Badge>on track</Badge>
            </TableCell>
            <TableCell>8/12/2025</TableCell>
            <TableCell>
              <Link className={cn(buttonVariants({ variant: "outline" }), "text-xs")} href={`/admin/children/${`iidiii`}`}>
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
