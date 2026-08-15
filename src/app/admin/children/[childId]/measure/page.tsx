import { ChildrenMeasureForm } from "@/features/children/components/ChildrenMeasureForm";
import React from "react";

interface Props {
  params: Promise<{
    childId: string;
  }>;
}

export default async function page({ params }: Props) {
  const { childId } = await params;
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold lg:text-2xl">Add new measurements</h2>
      <hr className="my-6" />
      <ChildrenMeasureForm />
    </div>
  );
}
