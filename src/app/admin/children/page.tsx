import GhostDatatable from "@/components/GhostDatatable";
import { buttonVariants } from "@/components/ui/button";
import { ChildrenDataTable } from "@/features/children/components/ChildrenDataTable";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold lg:text-2xl">Children</h2>
        <Link className={buttonVariants({})} href={"children/add"}>
          <PlusIcon />
          Add Child
        </Link>
      </div>
      <hr className="my-6" />
      <Suspense fallback={<GhostDatatable />}>
        <ChildrenDataTable />
      </Suspense>
    </div>
  );
}
