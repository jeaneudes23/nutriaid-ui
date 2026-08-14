import { cn } from "@/lib/utils";

export const UserAvatar = ({ name, className }: { name: string; className?: string }) => {
  return (
    <div
      className={cn("text-primary border-primary grid size-8 content-center rounded-full border-2 text-xs font-medium uppercase", className)}
    >{`${name.split(" ")[0][0]}${name.split(" ")[1] ? name.split(" ")[1][0] : ""}`}</div>
  );
};
