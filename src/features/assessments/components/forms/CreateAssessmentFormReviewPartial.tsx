import React from "react";
import { CreateAssessmentFormData } from "./CreateAssessmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RulerDimensionLineIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props {
  isVisible: boolean;
  formData: CreateAssessmentFormData;
}

export const CreateAssessmentFormReviewPartial = ({ isVisible, formData }: Props) => {
  return (
    <div className={cn(!isVisible ? "hidden" : "grid gap-8")}>
      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="inline-flex items-center gap-2">
            <RulerDimensionLineIcon />
            Measurements: Physical Data
          </CardTitle>
        </CardHeader>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <Label className="font-semibold">Measurement date</Label>
            <p className="text-sm text-gray-500">{formData.measuredAt}</p>
          </div>
          <div>
            <Label className="font-semibold">Age at measurement (months)</Label>
            <p className="text-sm text-gray-500">{formData.ageMonthsAtMeasurement}</p>
          </div>
          <div>
            <Label className="font-semibold">Weight</Label>
            <p className="text-sm text-gray-500">{formData.weightKg} kgs</p>
          </div>
          <div>
            <Label className="font-semibold">Height</Label>
            <p className="text-sm text-gray-500">{formData.heightCm} cm</p>
          </div>
          <div>
            <Label className="font-semibold">MUAC</Label>
            <p className="text-sm text-gray-500">{formData.muacCm} cm</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
