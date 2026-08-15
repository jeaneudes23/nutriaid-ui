"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { addChildrenAction } from "../../children-server-action";
import { AddChildFormBasicInfoPartial } from "./AddChildFormBasicInfoPartial";
import { AddChildFormMeasurementsPartial } from "./AddChildFormMeasurementsPartial";
import { AddChildFormBioPartial } from "./AddChildFormBioPartial";
import { AddChildFormReviewPartial } from "./AddChildFormReviewPartial";
import { SubmitButton } from "@/components/SubmitButton";
import toast from "react-hot-toast";

const STEP_COUNT = 4;
const STEPS = ["Identity", "Bio", "Measurements", "Review"];

export interface AddChildFormData {
  displayName: string;
  dateOfBirth: string;
  sex: string;
  heightCm: string;
  weightKg: string;
  muacCm: string;
  measuredAt: string;
}

export interface AppendAddChildFormDataParams {
  key: keyof AddChildFormData;
  value: string;
}

export const AddChildForm = () => {
  const [step, setStep] = useState<number>(0);

  const [formData, setFormData] = useState<AddChildFormData>({
    displayName: "",
    dateOfBirth: "",
    sex: "",
    heightCm: "",
    weightKg: "",
    muacCm: "",
    measuredAt: "",
  });

  const appendAddChildFormData = ({ key, value }: AppendAddChildFormDataParams) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const [state, action] = useActionState(addChildrenAction, {});

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
        {Array.from({ length: STEP_COUNT }, (_, i) => (
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
          <AddChildFormMeasurementsPartial prevs={state?.prevs?.assessment} isVisible={step == 1} appendAddChildFormData={appendAddChildFormData} />
          <AddChildFormBioPartial prevs={state?.prevs?.assessment} isVisible={step == 2} />
          <AddChildFormReviewPartial isVisible={step == 3} formData={formData} />
        </div>
        <div className="flex justify-between">
          <Button type="button" disabled={step == 0} variant={"outline"} onClick={() => setStep((prev) => prev - 1)}>
            <ArrowLeftIcon /> Back
          </Button>
          <SubmitButton className={step == STEP_COUNT - 1 ? "cursor-pointer" : "hidden"} type="submit">
            Add Child
          </SubmitButton>
          <Button className={step !== STEP_COUNT - 1 ? "" : "hidden"} type="button" disabled={step == STEP_COUNT - 1} onClick={() => setStep((prev) => prev + 1)}>
            Next
            <ArrowRightIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};
