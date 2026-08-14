import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Children = [
  {
    name: "Emma",
    age: "3y 2m",
    on_track: true,
  },
  {
    name: "Leo",
    age: "3y 2m",
    on_track: false,
  },
];
export const ChildrenList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      {Children.map((child, i) => (
        <div key={i} className="bg-background grid overflow-hidden rounded-md border shadow">
          <div className="flex items-start justify-between p-4">
            <div>
              <h3 className="font-semibold">{child.name}</h3>
              <span className="text-sm text-gray-600">{child.age}</span>
            </div>
            <Badge variant={child.on_track ? "default" : "destructive"}>
              {child.on_track ? <CheckIcon className="size-4" /> : <XIcon className="size-4" />}
              on track
            </Badge>
          </div>
          <div className="bg-primary/10 p-1 text-center">
            <Link href={`children/${child.name}`} className="text-primary text-sm font-semibold hover:underline">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
