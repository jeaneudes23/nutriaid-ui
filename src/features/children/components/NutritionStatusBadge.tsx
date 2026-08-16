import { cn } from "@/lib/utils";
import { ActivityIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import React from "react";

interface Props {
  status: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export const NutritionStatusBadge = ({ status, label, className, showIcon = true }: Props) => {
  const ICONS: Record<string, React.ReactNode> = {
    stunting: <TrendingDownIcon />,
    healthy: <TrendingUpIcon />,
    wasting: <ActivityIcon />,
  };
  return (
    <div className={cn("flex items-center gap-2 rounded-md px-3 py-1 text-white shadow-sm", className)} style={{ backgroundColor: `var(--${status.toLowerCase()})` }}>
      <span className="font-medium capitalize">{label ?? status}</span>
      {showIcon ? ICONS[status.toLowerCase()] : null}
    </div>
  );
};
