import React from "react";
import { Child } from "../children-schema";
import { UserAvatar } from "@/components/UserAvatar";
import Link from "next/link";
import { getAgeInYearsAndMonths, parseDate } from "@/lib/utils";

export const ChildCard = ({ child }: { child: Child }) => {
  return (
    <div className="group flex items-start gap-2">
      <UserAvatar name={child.displayName} className="bg-primary text-primary-foreground text-center" />
      <Link href={`/admin/children/${child._id}`}>
        <p className="group-hover:text-primary inline-flex items-center gap-2 font-semibold capitalize group-hover:underline">{child.displayName}</p>
        <p className="text-xs font-medium capitalize">{`DOB: ${parseDate(child.dateOfBirth)} (${getAgeInYearsAndMonths(child.dateOfBirth)})`}</p>
        <p className="text-xs font-medium capitalize">{`Gender: ${child.sex}`}</p>
      </Link>
    </div>
  );
};
