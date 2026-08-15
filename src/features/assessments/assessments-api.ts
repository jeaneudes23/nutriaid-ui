import { authApi } from "@/lib/api"
import { Assessment } from "./assessment-schema"

export async function getAssessments(limit?: number): Promise<Assessment[]> {
  try {
    const res = await authApi.get('/assessments')
    return res.data.data.items
  } catch (error) {
    return []
  }
}