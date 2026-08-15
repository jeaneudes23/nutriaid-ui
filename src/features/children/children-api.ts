import { authApi } from "@/lib/api"
import { Child, ChildWithAssessment } from "./children-schema"
import { AxiosError } from "axios"

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
  } catch (error) {
    return null
  }
}

