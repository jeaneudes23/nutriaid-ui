import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ExternalLinkIcon, RulerDimensionLineIcon, WeightIcon } from "lucide-react";
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

const ChildCard = () => {
  return (
    <Card className="pt-0">
      <CardHeader className="bg-primary/10 flex w-full items-end justify-between py-2 pt-10">
        <UserAvatar name="Mary waters" className="bg-primary text-primary-foreground size-14 rounded-md text-center text-lg font-bold" />
        <Badge className="bg-green-600">On track</Badge>
      </CardHeader>
      <CardContent>
        <div>
          <div className="font-semibold">Emmma Emily</div>
          <div className="text-muted-foreground">1y 2m</div>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <div className="inline-flex items-center gap-1">
            <WeightIcon className="size-4" />
            <span className="font-medium">1.2 kgs</span>
          </div>
          <div className="inline-flex items-center gap-1">
            <RulerDimensionLineIcon className="size-4" />
            <span className="font-medium">56 cm</span>
          </div>
        </div>
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
