import { CreateAssessmentForm } from "@/features/assessments/components/forms/CreateAssessmentForm";
import { getChild } from "@/features/children/children-api";
import { ChildCard } from "@/features/children/components/ChildCard";
import React from "react";

interface Props {
  params: Promise<{
    childId: string;
  }>;
}

export default async function page({ params }: Props) {
  const { childId } = await params;
  const child = await getChild(childId);
  if (!child)
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold lg:text-2xl">Child not found</h2>
      </div>
    );
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold lg:text-2xl">Add new measurements</h2>
      <hr className="my-6" />
      <div className="grid gap-6">
        <div className="flex">
          <ChildCard child={child} />
        </div>
        <CreateAssessmentForm child={child} />
      </div>
    </div>
  );
}
