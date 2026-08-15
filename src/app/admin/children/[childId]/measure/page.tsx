import { UserAvatar } from "@/components/UserAvatar";
import { CreateAssessmentForm } from "@/features/assessments/components/forms/CreateAssessmentForm";
import { getChild } from "@/features/children/children-api";
import { getAgeInMonths } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
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
      <div className="group mb-6 flex items-center gap-2">
        <UserAvatar name={child.displayName} className="bg-primary text-primary-foreground text-center" />
        <Link href={"/admin/children/3939"}>
          <p className="group-hover:text-primary inline-flex items-center gap-2 font-semibold group-hover:underline">
            {child.displayName} <ExternalLinkIcon className="size-4" />
          </p>
          <p className="text-muted-foreground text-xs font-medium capitalize">
            {child.sex}, {getAgeInMonths(child.dateOfBirth)} months
          </p>
        </Link>
      </div>
      <CreateAssessmentForm child={child} />
    </div>
  );
}
