import { authApi } from "@/lib/api"
import { Child, ChildWithAssessment } from "./children-schema"
import { AxiosError } from "axios"
import { Assessment } from "../assessments/assessment-schema"

export async function getChildren(limit?: number): Promise<Child[]> {
  try {
    const res = await authApi.get('/children', {
      params: {
        limit: limit ?? 100
      }
    })
    const children = res.data?.data?.items
    return children
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
    }
    return []
  }
}

export async function getChild(id: string): Promise<ChildWithAssessment | null> {
  try {
    const res = await authApi.get(`/children/${id}`)
    return res.data.data
  } catch {
    return null
  }
}

export async function getChildAssessments(childId: string): Promise<Assessment[]> {
  try {
    const res = await authApi.get(`/children/${childId}/assessments`)
    return res.data.data.items
  } catch {
    return []
  }
}
