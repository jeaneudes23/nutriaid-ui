"use client";

import { Button } from "@/components/ui/button";
import { cn, getAgeInMonths, getDateRanges } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { CreateAssessmentFormMeasurementsPartial } from "./CreateAssessmentFormMeasurementsPartial";
import { SubmitButton } from "@/components/SubmitButton";
import toast from "react-hot-toast";
import { createAssessmentAction } from "../../assessment-server-action";
import { CreateAssessmentFormBioPartial } from "./CreateAssessmentFormBioPartial";
import { CreateAssessmentFormReviewPartial } from "./CreateAssessmentFormReviewPartial";
import { Input } from "@/components/ui/input";
import { Child } from "@/features/children/children-schema";

const STEPS = ["Measurements", "Bio", "Review"];

export interface CreateAssessmentFormData {
  heightCm: string;
  weightKg: string;
  muacCm: string;
  ageMonthsAtMeasurement: string;
  measuredAt: string;
}

export interface AppendCreateAssessmentFormDataParams {
  key: keyof CreateAssessmentFormData;
  value: string;
}

export const CreateAssessmentForm = ({ child }: { child: Child }) => {
  const [step, setStep] = useState<number>(0);

  const { maxDate } = getDateRanges();

  const [formData, setFormData] = useState<CreateAssessmentFormData>({
    heightCm: "",
    weightKg: "",
    muacCm: "",
    ageMonthsAtMeasurement: getAgeInMonths(child.dateOfBirth),
    measuredAt: maxDate,
  });

  const appendCreateAssessmentFormData = ({ key, value }: AppendCreateAssessmentFormDataParams) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const [state, action] = useActionState(createAssessmentAction, {});

  const stateRef = React.useRef<typeof state | null>(null);

  useEffect(() => {
    if (stateRef.current == state || !state.message) return;
    stateRef.current = state;

    if (state.success) {
      toast.success(state.message);
    }
    {
      toast.error(state.message);
    }
  });

  return (
    <div className="grid gap-8">
      <div className="flex items-center gap-6">
        {Array.from({ length: STEPS.length }, (_, i) => (
          <div key={i} className="grid w-full gap-1">
            <span className={cn("text-sm font-medium transition-colors", i <= step ? "text-primary" : "")}>
              Step {i + 1}: {STEPS[i]}
            </span>
            <span
              className={cn(
                i <= step ? "before:w-full" : "before:w-0",
                "bg-primary/10 before:bg-primary relative h-1 w-full rounded-full before:absolute before:h-full before:rounded-[inherit] before:transition-all before:duration-300 before:content-['']",
              )}
              key={i}
            ></span>
          </div>
        ))}
      </div>
      <form action={action} className="grid gap-8">
        <Input name="childId" id="childId" readOnly value={child._id} type="hidden" />
        <div>
          <CreateAssessmentFormMeasurementsPartial dateOfBirth={child.dateOfBirth} prevs={state?.prevs} isVisible={step == 0} appendCreateAssessmentFormData={appendCreateAssessmentFormData} />
          <CreateAssessmentFormBioPartial prevs={state?.prevs} isVisible={step == 1} />
          <CreateAssessmentFormReviewPartial isVisible={step == 2} formData={formData} />
        </div>
        <div className="flex justify-between">
          <Button type="button" disabled={step == 0} variant={"outline"} onClick={() => setStep((prev) => prev - 1)}>
            <ArrowLeftIcon /> Back
          </Button>
          <SubmitButton className={step == STEPS.length - 1 ? "cursor-pointer" : "hidden"} type="submit">
            Add Child
          </SubmitButton>
          <Button className={step !== STEPS.length - 1 ? "" : "hidden"} type="button" disabled={step == STEPS.length - 1} onClick={() => setStep((prev) => prev + 1)}>
            Next
            <ArrowRightIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};
