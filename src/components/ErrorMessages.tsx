import { XCircleIcon } from "lucide-react";
import React from "react";

interface Props {
  icon?: React.ReactNode;
  label?: string;
}

export const EmptyErrorMessage = ({ icon = <XCircleIcon className="size-16" strokeWidth={1} />, label = "not found" }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span>{icon}</span>
      <p className="text-xl font-bold capitalize">{label}</p>
    </div>
  );
};
