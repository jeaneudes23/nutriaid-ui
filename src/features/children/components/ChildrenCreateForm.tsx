"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, getAgeInMonths } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon, ListTodoIcon, RulerDimensionLine } from "lucide-react";
import { useState } from "react";

const STEP_COUNT = 3;
const STEPS = ["identity", "measurements", "review"];

interface FormData {
  name: string;
  dob: string;
  gender: string;
  height: string;
  weight: string;
  muac: string;
  measurementDate: string;
}

interface UpdateFormDateParams {
  key: keyof FormData;
  value: string;
}

export const ChildrenCreateForm = () => {
  const [step, setStep] = useState<number>(0);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    muac: "",
    measurementDate: "",
  });

  const updateFormData = ({ key, value }: UpdateFormDateParams) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <div className="grid gap-8">
      <div className="flex items-center gap-6">
        {Array.from({ length: STEP_COUNT }, (_, i) => (
          <div key={i} className="grid w-full gap-1">
            <span className={cn("text-xs font-medium transition-colors", i <= step ? "text-primary" : "")}>
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
      <form action="" className="grid gap-8">
        <div>
          <BasicInfoStep isVisible={step == 0} updateFormData={updateFormData} />
          <MeasurementsInfoStep isVisible={step == 1} updateFormData={updateFormData} />
          <ReviewStep isVisible={step == 2} formData={formData} />
        </div>
        <div className="flex justify-between">
          <Button type="button" disabled={step == 0} variant={"outline"} onClick={() => setStep((prev) => prev - 1)}>
            <ArrowLeftIcon /> Back
          </Button>
          <Button className={step == STEP_COUNT - 1 ? "" : "hidden"} type="submit">
            Save
          </Button>
          <Button className={step !== STEP_COUNT - 1 ? "" : "hidden"} type="button" disabled={step == STEP_COUNT - 1} onClick={() => setStep((prev) => prev + 1)}>
            Next
            <ArrowRightIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

const BasicInfoStep = ({ isVisible, updateFormData }: { isVisible: boolean; updateFormData: ({ key, value }: UpdateFormDateParams) => void }) => {
  return (
    <div className={cn(!isVisible ? "hidden" : "bg-background border-primary grid gap-8 rounded-md border border-l-6 p-6 shadow")}>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <ListTodoIcon className="inline" />
          <h2 className="font-heading text-lg font-semibold">Child&apos;s Basic Info</h2>
        </div>
        <p className="text-sm text-gray-600">Step 1: Provide basic identity details to begin the child&apos;s nutritional measurement assessment.</p>
      </div>
      <div className="grid max-w-lg gap-4">
        <div className="grid gap-1">
          <Label>Child name</Label>
          <Input onChange={(e) => updateFormData({ key: "name", value: e.target.value })} name="name" id="name" />
        </div>
        <div className="grid gap-1">
          <Label>Date of birth</Label>
          <Input onChange={(e) => updateFormData({ key: "dob", value: e.target.value })} type="date" name="name" id="name" />
        </div>
        <div className="grid gap-1">
          <Label>Gender</Label>
          <select
            onChange={(e) => updateFormData({ key: "gender", value: e.target.value })}
            className={cn(
              "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-9 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
            )}
            name="gender"
            id="gender"
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const MeasurementsInfoStep = ({ isVisible, updateFormData }: { isVisible: boolean; updateFormData: ({ key, value }: UpdateFormDateParams) => void }) => {
  return (
    <div className={cn(!isVisible ? "hidden" : "bg-background border-primary grid gap-8 rounded-md border border-l-6 p-6 shadow")}>
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <RulerDimensionLine className="inline" />
          <h2 className="font-heading text-lg font-semibold">Measurements: Physical Data</h2>
        </div>
        <p className="text-sm text-gray-600">Enter your child&apos;s weight and height to get personalized meal recommendations.</p>
      </div>
      <div className="grid max-w-lg gap-4">
        <div className="grid gap-1">
          <Label>Weight (kg)</Label>
          <Input onChange={(e) => updateFormData({ key: "weight", value: e.target.value })} min={0.1} type="number" name="weight" id="weight" />
        </div>
        <div className="grid gap-1">
          <Label>Height (cm)</Label>
          <Input onChange={(e) => updateFormData({ key: "height", value: e.target.value })} min={1} type="number" name="height" id="height" />
        </div>
        <div className="grid gap-1">
          <Label>MUAC (cm)</Label>
          <p className="text-xs text-gray-400">Mid-Upper Arm Circumference</p>
          <Input onChange={(e) => updateFormData({ key: "muac", value: e.target.value })} min={1} type="number" name="muac" id="muac" />
        </div>
        <div className="grid gap-1">
          <Label>Measurement date</Label>
          <Input onChange={(e) => updateFormData({ key: "measurementDate", value: e.target.value })} type="date" name="name" id="name" />
        </div>
      </div>
    </div>
  );
};

const ReviewStep = ({ isVisible, formData }: { isVisible: boolean; formData: FormData }) => {
  return (
    <div className={cn(!isVisible ? "hidden" : "grid gap-8")}>
      <div className="bg-background border-primary grid gap-6 rounded-md border border-l-6 p-6 shadow">
        <div className="flex items-center gap-2">
          <ListTodoIcon className="text-primary inline" />
          <h2 className="font-heading text-primary text-lg font-semibold">Child&apos;s Basic Info</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="font-semibold">Child name</Label>
            <p className="text-sm text-gray-500">{formData.name}</p>
          </div>
          <div>
            <Label className="font-semibold">Date of birth</Label>
            <p className="text-sm text-gray-500">{formData.dob}</p>
          </div>
          <div>
            <Label className="font-semibold">Gender</Label>
            <p className="text-sm text-gray-500">{formData.gender}</p>
          </div>
        </div>
      </div>
      <div className="bg-background border-primary grid gap-6 rounded-md border border-l-6 p-6 shadow">
        <div className="flex items-center gap-2">
          <RulerDimensionLine className="text-primary inline" />
          <h2 className="font-heading text-primary text-lg font-semibold">Measurements: Physical Data</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="font-semibold">Calculated Age</Label>
            <p className="text-sm text-gray-500">{getAgeInMonths(formData.dob)}</p>
          </div>
          <div>
            <Label className="font-semibold">Weight</Label>
            <p className="text-sm text-gray-500">{formData.weight} kgs</p>
          </div>
          <div>
            <Label className="font-semibold">Height</Label>
            <p className="text-sm text-gray-500">{formData.weight} cm</p>
          </div>
          <div>
            <Label className="font-semibold">MUAC</Label>
            <p className="text-sm text-gray-500">{formData.muac} cm</p>
          </div>
        </div>
      </div>
    </div>
  );
};
