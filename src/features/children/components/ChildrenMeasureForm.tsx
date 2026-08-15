"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn, getAgeInMonths } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon, ListTodoIcon, MessageCircleQuestionMarkIcon, RulerDimensionLine } from "lucide-react";
import { useState } from "react";
import { CHILD_BIO_QUESTIONS } from "../child-bio-questions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STEPS = ["Measurements", "Bio", "Review"];

interface FormData {
  height: string;
  weight: string;
  muac: string;
  measurementDate: string;
}

interface UpdateFormDateParams {
  key: keyof FormData;
  value: string;
}

export const ChildrenMeasureForm = () => {
  const [step, setStep] = useState<number>(0);

  const [formData, setFormData] = useState<FormData>({
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
      <form action="" className="grid gap-8">
        <div>
          <MeasurementsInfoStep isVisible={step == 0} updateFormData={updateFormData} />
          <BioStep isVisible={step == 1} />
          <ReviewStep isVisible={step == 2} formData={formData} />
        </div>
        <div className="flex justify-between">
          <Button type="button" disabled={step == 0} variant={"outline"} onClick={() => setStep((prev) => prev - 1)}>
            <ArrowLeftIcon /> Back
          </Button>
          <Button className={step == STEPS.length - 1 ? "" : "hidden"} type="submit">
            Save
          </Button>
          <Button className={step !== STEPS.length - 1 ? "" : "hidden"} type="button" disabled={step == STEPS.length - 1} onClick={() => setStep((prev) => prev + 1)}>
            Next
            <ArrowRightIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

const MeasurementsInfoStep = ({ isVisible, updateFormData }: { isVisible: boolean; updateFormData: ({ key, value }: UpdateFormDateParams) => void }) => {
  return (
    <Card className={cn(!isVisible ? "hidden" : "max-w-3xl")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RulerDimensionLine className="inline" />
          Measurements: Physical Data
        </CardTitle>
        <CardDescription>Enter your child&apos;s weight and height to get personalized meal recommendations.</CardDescription>
      </CardHeader>
      <CardContent className="grid max-w-lg gap-4">
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
      </CardContent>
    </Card>
  );
};

const ReviewStep = ({ isVisible, formData }: { isVisible: boolean; formData: FormData }) => {
  return (
    <div className={cn(!isVisible ? "hidden" : "grid gap-8")}>
      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="inline-flex items-center gap-2">
            <RulerDimensionLine />
            Measurements: Physical Data
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
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
        </CardContent>
      </Card>
    </div>
  );
};

const BioStep = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <Card className={cn(!isVisible ? "hidden" : "max-w-3xl")}>
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <MessageCircleQuestionMarkIcon />
          Nutrition Assessment Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {CHILD_BIO_QUESTIONS.map((bioq, i) => (
          <div key={i} className="grid gap-1">
            <Label htmlFor={`bio_${i}`}>{bioq.title}</Label>
            <p className="text-muted-foreground text-sm">{bioq.question}</p>
            <Textarea name={`bio_${i}`} id={`bio_${i}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
