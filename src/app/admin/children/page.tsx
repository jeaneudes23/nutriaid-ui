import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChildrenDataTable } from "@/features/children/components/ChildrenDataTable";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

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
      <Card>
        <CardContent>
          <ChildrenDataTable />
        </CardContent>
      </Card>
    </div>
  );
}
