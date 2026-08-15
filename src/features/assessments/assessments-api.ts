import { authApi } from "@/lib/api"

export async function getAssessments() {
  try {
    const res = await authApi.get('/assessments')
    return res.data
  } catch (error) {
    return []
  }
}