import { AssessmentsDatatable } from "@/features/assessments/components/AssessmentsDatatable";
import React from "react";

export default function page() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold lg:text-2xl">Assessments</h2>
      <hr className="my-6" />
      <AssessmentsDatatable />
    </div>
  );
}
