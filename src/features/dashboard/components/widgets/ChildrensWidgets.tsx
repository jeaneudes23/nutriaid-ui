import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export const ChildrensWidgets = () => {
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
        <ChildrenTable />
      </CardContent>
    </Card>
  );
};

const ChildrenTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Full name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Height (cm)</TableHead>
          <TableHead>Weight (kgs)</TableHead>
          <TableHead>Last measurement</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Jackie smith</TableCell>
          <TableCell>1y 2m</TableCell>
          <TableCell>60</TableCell>
          <TableCell>60</TableCell>
          <TableCell>8/12/2025</TableCell>
          <TableCell>
            <Link className={cn(buttonVariants({ variant: "outline" }), "text-xs")} href={`/admin/children/${`iidiii`}`}>
              View
              <ExternalLinkIcon className="size-4" />
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
