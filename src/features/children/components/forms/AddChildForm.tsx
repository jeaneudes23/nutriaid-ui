"use client";

import { Button } from "@/components/ui/button";
import { cn, getDateRanges } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { addChildrenAction } from "../../children-server-action";
import { AddChildFormBasicInfoPartial } from "./AddChildFormBasicInfoPartial";
import { AddChildFormMeasurementsPartial } from "./AddChildFormMeasurementsPartial";
import { AddChildFormBioPartial } from "./AddChildFormBioPartial";
import { AddChildFormReviewPartial } from "./AddChildFormReviewPartial";
import { SubmitButton } from "@/components/SubmitButton";
import toast from "react-hot-toast";
import { useToast } from "@/hooks/useToast";

const STEPS = ["Identity", "Bio", "Measurements", "Review"];

export interface AddChildFormData {
  displayName: string;
  dateOfBirth: string;
  sex: string;
  heightCm: string;
  weightKg: string;
  muacCm: string;
  measuredAt: string;
  ageMonthsAtMeasurement: string;
}

export interface AppendAddChildFormDataParams {
  key: keyof AddChildFormData;
  value: string;
}

export const AddChildForm = () => {
  const [step, setStep] = useState<number>(0);

  const { maxDate } = getDateRanges();

  const [formData, setFormData] = useState<AddChildFormData>({
    displayName: "",
    dateOfBirth: maxDate,
    sex: "",
    heightCm: "",
    weightKg: "",
    muacCm: "",
    ageMonthsAtMeasurement: "1",
    measuredAt: maxDate,
  });

  const appendAddChildFormData = ({ key, value }: AppendAddChildFormDataParams) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [state, action] = useActionState(addChildrenAction, {});

  useToast({ state });

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
        <div>
          <AddChildFormBasicInfoPartial prevs={state?.prevs} isVisible={step == 0} appendAddChildFormData={appendAddChildFormData} />
          <AddChildFormMeasurementsPartial dateOfBirth={formData.dateOfBirth} prevs={state?.prevs?.assessment} isVisible={step == 1} appendAddChildFormData={appendAddChildFormData} />
          <AddChildFormBioPartial prevs={state?.prevs?.assessment} isVisible={step == 2} />
          <AddChildFormReviewPartial isVisible={step == 3} formData={formData} />
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
