"use server"

import { authApi } from "@/lib/api";
import { ServerActionState } from "@/types";
import { AxiosError } from "axios";

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

  console.log(rawFormData)

  try {
    await authApi.post('/children', { ...rawFormData })
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
    }
  }

  return {
    success: true,
    message: "child created",
    prevs: rawFormData
  }
}