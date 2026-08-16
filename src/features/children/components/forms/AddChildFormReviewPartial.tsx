import React from "react";
import { AddChildFormData } from "./AddChildForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodoIcon, RulerDimensionLineIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn, getAgeInYearsAndMonths } from "@/lib/utils";

interface Props {
  isVisible: boolean;
  formData: AddChildFormData;
}

export const AddChildFormReviewPartial = ({ isVisible, formData }: Props) => {
  return (
    <div className={cn(!isVisible ? "hidden" : "grid gap-8")}>
      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="inline-flex items-center gap-2">
            <ListTodoIcon />
            Child&apos;s Basic Info
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <Label className="font-semibold">Child name</Label>
            <p className="text-sm text-gray-500">{formData.displayName}</p>
          </div>
          <div>
            <Label className="font-semibold">Date of birth</Label>
            <p className="text-sm text-gray-500">{`${formData.dateOfBirth} (${getAgeInYearsAndMonths(formData.dateOfBirth)})`}</p>
          </div>
          <div>
            <Label className="font-semibold">Gender</Label>
            <p className="text-sm text-gray-500">{formData.sex}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="inline-flex items-center gap-2">
            <RulerDimensionLineIcon />
            Measurements: Physical Data
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 items-start gap-6">
          <div>
            <Label className="font-semibold">Measurement date</Label>
            <p className="text-sm text-gray-500">{formData.measuredAt}</p>
          </div>
          <div>
            <Label className="font-semibold">Age at measurement</Label>
            <p className="text-sm text-gray-500">{getAgeInYearsAndMonths(formData.dateOfBirth, formData.measuredAt)}</p>
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
