"use server"

import { authApi } from "@/lib/api";
import { handleAxiosErrorOnServer } from "@/lib/auth";
import { ServerActionState } from "@/types";
import { AxiosError, AxiosResponse } from "axios";

export async function performAction(prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
  const method = formData.get("method") as "post" | "delete" | "patch"
  const apiUrl = formData.get("apiUrl") as string

  try {
    let res: AxiosResponse | undefined
    if (method == 'post') res = await authApi.post(apiUrl)
    if (method == 'patch') res = await authApi.patch(apiUrl)
    if (method == 'delete') res = await authApi.delete(apiUrl)

    return {
      success: true,
      message: "Success! Your action was completed."
    }

  } catch (error) {
    if (error instanceof AxiosError) {
      await handleAxiosErrorOnServer(error)
    }
    return {
      success: false,
      message: "An error occurred. Please try again."
    }
  }

}