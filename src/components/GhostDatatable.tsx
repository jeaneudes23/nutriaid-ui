import React from "react";
import { Card, CardContent } from "./ui/card";

export default function GhostDatatable() {
  return (
    <Card>
      <CardContent>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="h-10 animate-pulse rounded-md bg-gray-200"></span>
        ))}
      </CardContent>
    </Card>
  );
}
