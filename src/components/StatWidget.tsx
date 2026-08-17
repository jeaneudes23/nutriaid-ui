import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { StatForWidget } from "@/types";

export const StatWidget = ({ stat }: { stat: StatForWidget }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">{stat.icon}</div>
        <div>
          <div>
            <span className="text-2xl font-bold">{stat.value} </span>
          </div>
          <CardTitle className="text-muted-foreground text-sm font-medium">{stat.title}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};
