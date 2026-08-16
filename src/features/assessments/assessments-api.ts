import { authApi } from "@/lib/api"
import { Assessment, AssessmentWithChild } from "./assessment-schema"
import { CheckIcon, CircleIcon, ExternalLinkIcon, MoveVerticalIcon, PersonStandingIcon, WeightIcon } from "lucide-react";
import { parseDate } from "@/lib/utils";
import { ReactNode } from "react";


export async function getAssessment(id: string): Promise<AssessmentWithChild | null> {
  try {
    const res = await authApi.get(`/assessments/${id}`)
    return res.data.data
  } catch {
    return null
  }
}

export async function getAssessments(limit?: number): Promise<Assessment[]> {
  try {
    const res = await authApi.get('/assessments', {
      params: {
        limit: limit ?? 100
      }
    })
    return res.data.data.items
  } catch {
    return []
  }
}

interface Stat {
  title: string;
  icon: ReactNode;
  value: string | number;
  unit?: string;
}

