import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ChilMeasurementHistoryDataTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Measurement history</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Height (cm)</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>MUAC (cm)</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }, (_, i) => (
              <TableRow key={i}>
                <TableCell>8/12/2025</TableCell>
                <TableCell>1y 2m</TableCell>
                <TableCell>13.2</TableCell>
                <TableCell>84.3</TableCell>
                <TableCell>10.4</TableCell>
                <TableCell>
                  <Button variant={"outline"}>
                    <TrashIcon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
