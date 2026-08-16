import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RulerDimensionLine } from "lucide-react";
import React from "react";
import { AppendCreateAssessmentFormDataParams } from "./CreateAssessmentForm";
import { cn, getAgeInMonths, getDateRanges, parseDate } from "@/lib/utils";
import { ServerActionState } from "@/types";

interface Props {
  isVisible: boolean;
  prevs?: ServerActionState["prevs"];
  errors?: ServerActionState["errors"];
  dateOfBirth: string;
  appendCreateAssessmentFormData: ({ key, value }: AppendCreateAssessmentFormDataParams) => void;
}

export const CreateAssessmentFormMeasurementsPartial = ({ isVisible, prevs, dateOfBirth, appendCreateAssessmentFormData }: Props) => {
  const { minDate, maxDate } = getDateRanges();

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
          <Input
            key={prevs?.weightKg}
            defaultValue={prevs?.weightKg ?? ""}
            onChange={(e) => appendCreateAssessmentFormData({ key: "weightKg", value: e.target.value })}
            min={0}
            type="number"
            name="weightKg"
            id="weightKg"
          />
        </div>
        <div className="grid gap-1">
          <Label>Height (cm)</Label>
          <Input
            key={prevs?.heightCm}
            defaultValue={prevs?.heightCm ?? ""}
            onChange={(e) => appendCreateAssessmentFormData({ key: "heightCm", value: e.target.value })}
            min={0}
            type="number"
            name="heightCm"
            id="heightCm"
          />
        </div>
        <div className="grid gap-1">
          <Label>MUAC (cm)</Label>
          <p className="text-xs text-gray-400">Mid-Upper Arm Circumference</p>
          <Input
            key={prevs?.muacCm}
            defaultValue={prevs?.muacCm ?? ""}
            onChange={(e) => appendCreateAssessmentFormData({ key: "muacCm", value: e.target.value })}
            min={0}
            type="number"
            name="muacCm"
            id="muacCm"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="ageMonthsAtMeasurement">Age (months)</Label>
          <p className="text-xs text-gray-400">{`Date of birth: ${parseDate(dateOfBirth)} (${getAgeInMonths(dateOfBirth)} months)`}</p>
          <Input
            key={prevs?.ageMonthsAtMeasurement}
            defaultValue={prevs?.ageMonthsAtMeasurement ?? getAgeInMonths(dateOfBirth)}
            onChange={(e) => appendCreateAssessmentFormData({ key: "ageMonthsAtMeasurement", value: e.target.value })}
            min={0}
            type="number"
            name="ageMonthsAtMeasurement"
            id="ageMonthsAtMeasurement"
          />
        </div>
        <div className="grid gap-1">
          <Label>Measurement date</Label>
          <Input
            min={minDate}
            max={maxDate}
            key={prevs?.measuredAt}
            defaultValue={prevs?.measuredAt ?? maxDate}
            onChange={(e) => appendCreateAssessmentFormData({ key: "measuredAt", value: e.target.value })}
            type="date"
            name="measuredAt"
            id="measuredAt"
          />
        </div>
      </CardContent>
    </Card>
  );
};
