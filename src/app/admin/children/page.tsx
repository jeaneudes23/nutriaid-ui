import { ChildrenList } from "@/components/features/children/components/ChildrenList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="grid gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-3xl font-semibold">Child Profiles</h2>
          <Link href={"children/add"} className={cn(buttonVariants({}), "h-auto px-6 py-2")}>
            Add new
          </Link>
        </div>
        <ChildrenList />
      </div>
    </div>
  );
}
