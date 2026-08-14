import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <div className="bg-background grid h-dvh grid-cols-[auto_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col gap-8 overflow-y-auto">{children}</div>
    </div>
  );
}
