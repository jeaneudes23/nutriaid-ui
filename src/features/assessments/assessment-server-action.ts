"use server"

import { authApi } from "@/lib/api"
import { ServerActionState } from "@/types"
import { Assessment } from "./assessment-schema"
import { AxiosError } from "axios"
import { handleAxiosErrorOnServer } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function createAssessmentAction(prev: ServerActionState, formData: FormData): Promise<ServerActionState> {
  const rawFormData = {
    childId: formData.get("childId") as string,
    measuredAt: formData.get("measuredAt") as string,
    ageMonthsAtMeasurement: formData.get("ageMonthsAtMeasurement") as string,
    weightKg: formData.get("weightKg") as string,
    heightCm: formData.get("heightCm") as string,
    muacCm: formData.get("muacCm") as string,
    dietaryIntakeHistory: formData.get("dietaryIntakeHistory") as string,
    healthAndMedicalBackground: formData.get("healthAndMedicalBackground") as string,
    feedingChallenges: formData.get("feedingChallenges") as string,
    allergiesAndPreferences: formData.get("allergiesAndPreferences") as string,
    householdContext: formData.get("householdContext") as string,
  }

  let assessmentId = null

  try {
    const res = await authApi.post('/assessments', { ...rawFormData })
    const assessment = res.data.data as Assessment
    assessmentId = assessment._id

  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errors = await handleAxiosErrorOnServer(error)
      return {
        success: false,
        message: error.response?.data?.title,
        errors: errors,
        prevs: rawFormData
      }
    }
  }

  redirect(`/admin/assessments/${assessmentId}`)
}