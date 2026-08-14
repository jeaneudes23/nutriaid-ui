import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChildrenDataTable } from "@/features/children/components/ChildrenDataTable";
import { BabyIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-heading text-xl font-bold lg:text-2xl">Children</h2>
        <Link className={buttonVariants({})} href={"children/add"}>
          <BabyIcon />
          Add Child
        </Link>
      </div>
      <div>
        <Card>
          <ChildrenDataTable />
        </Card>
      </div>
    </div>
  );
}
