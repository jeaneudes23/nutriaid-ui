import React from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

export default function GhostDatatable() {
  return (
    <Card>
      <CardContent>
        {Array.from({ length: 10 }, (_, i) => (
          <GhostContent key={i} />
        ))}
      </CardContent>
    </Card>
  );
}

export function GhostContent({ className }: { className?: string }) {
  return <div className={cn("h-10 animate-pulse rounded-md border bg-gray-100", className)}></div>;
}
