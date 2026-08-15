import { authApi } from "@/lib/api"
import { Assessment, AssessmentWithChild } from "./assessment-schema"

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
    const res = await authApi.get('/assessments')
    return res.data.data.items
  } catch (error) {
    return []
  }
}