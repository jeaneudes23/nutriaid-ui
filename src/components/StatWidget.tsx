import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface Props {
  stat: {
    title: string;
    icon: React.ReactNode;
    value: string | number;
    unit?: string;
  };
}

export const StatWidget = ({ stat }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground inline-flex items-center gap-2 text-sm">
          <span className="text-primary-foreground bg-primary grid size-8 place-content-center rounded-full">{stat.icon}</span> {stat.title}
        </CardTitle>
        <div>
          <span className="text-2xl font-bold">{stat.value}</span>
          <span className="text-muted-foreground font-medium"> {stat.unit}</span>
        </div>
      </CardHeader>
    </Card>
  );
};
