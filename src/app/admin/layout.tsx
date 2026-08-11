import { DashboardNavbar } from "@/components/features/dashboard/DashboardNavbar";
import { Sidebar } from "@/components/features/dashboard/Sidebar";
import React from "react";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] gap-4 bg-gray-100">
      <Sidebar />
      <div className="flex h-dvh flex-col gap-4 pt-4">
        <DashboardNavbar />
        <div className="grow overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
