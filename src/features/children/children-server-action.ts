"use server"

import { authApi } from "@/lib/api";
import { BackEndErrorResponse, ServerActionState } from "@/types";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { Child } from "./children-schema";

export async function addChildrenAction(prev: ServerActionState, formData: FormData): Promise<ServerActionState> {
  const rawFormData = {
    displayName: formData.get("displayName") as string,
    dateOfBirth: formData.get("dateOfBirth") as string,
    sex: formData.get("sex") as string,
    assessment: {
      measuredAt: formData.get("measuredAt") as string,
      weightKg: formData.get("weightKg") as string,
      heightCm: formData.get("heightCm") as string,
      muacCm: formData.get("muacCm") as string,
      dietaryIntakeHistory: formData.get("dietaryIntakeHistory") as string,
      healthAndMedicalBackground: formData.get("healthAndMedicalBackground") as string,
      feedingChallenges: formData.get("feedingChallenges") as string,
      allergiesAndPreferences: formData.get("allergiesAndPreferences") as string,
      householdContext: formData.get("householdContext") as string,
    }
  }

  let childId = null

  try {
    const res = await authApi.post('/children', { ...rawFormData })
    const child = res.data.data.child as Child
    childId = child._id

  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const data = error.response.data as BackEndErrorResponse
      const errors = data.errors.reduce((acc, error) => ({ ...acc, [error.param]: error.message }), {})
      return {
        success: false,
        message: error.response?.data?.title,
        errors: errors,
        prevs: rawFormData
      }
    }
  }

  redirect(`/admin/children/${childId}`)
}