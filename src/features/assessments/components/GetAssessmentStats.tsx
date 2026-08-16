import { CalendarIcon, CircleIcon, MoveVerticalIcon, PersonStandingIcon, UserIcon, WeightIcon } from "lucide-react";
import { Assessment } from "../assessment-schema";
import { parseDate } from "@/lib/utils";

interface Stat {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  unit?: string;
}

export function getAssessmentStats(assessment: Assessment): Stat[] {
  return [
    { title: "Age", icon: <UserIcon className="size-4" />, value: assessment.ageMonthsAtMeasurement, unit: "months" },
    { title: "Measured At", icon: <CalendarIcon className="size-4" />, value: parseDate(assessment.measuredAt) },
    { title: "Weight", icon: <WeightIcon className="size-4" />, value: assessment.weightKg, unit: "kg" },
    { title: "Height", icon: <MoveVerticalIcon className="size-4" />, value: assessment.heightCm, unit: "cm" },
    { title: "MUAC", icon: <CircleIcon className="size-4" />, value: assessment.muacCm, unit: "cm" },
    { title: "BMI", icon: <PersonStandingIcon className="size-4" />, value: assessment.bmi.toFixed(1), unit: "kg/m²" },
  ];
}
