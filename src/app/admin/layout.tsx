import { DashboardNavbar } from "@/components/features/dashboard/DashboardNavbar";
import { DashboardSidebar } from "@/components/features/dashboard/DashboardSidebar";
import React from "react";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] gap-8 bg-gray-50">
      <DashboardSidebar />
      <div className="flex h-dvh flex-col gap-8">
        <DashboardNavbar />
        <div className="grow overflow-y-auto px-4 pt-4">{children}</div>
      </div>
    </div>
  );
}
