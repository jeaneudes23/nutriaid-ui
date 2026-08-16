import { GhostContent } from "@/components/GhostDatatable";
import React from "react";

export default function loading() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <GhostContent className="col-span-full h-24" />
      <GhostContent className="h-64" />
      <GhostContent className="h-64" />
      <GhostContent className="col-span-full h-32" />
      <GhostContent className="col-span-full h-32" />
    </div>
  );
}
