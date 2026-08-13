"use server"

import { signIn, signOut } from "@/lib/auth";
import { BackEndErrorResponse, ServerActionState } from "@/types";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { signinSchema, signupSchema } from "./auth-schema";
import z from "zod";

export async function signupAction(_formState: ServerActionState, formData: FormData): Promise<ServerActionState> {
  const rawFormData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  }

  const validated = signupSchema.safeParse(rawFormData)

  if (validated.error) return {
    success: false,
    message: 'One or more fields are incorrect. Please update them.',
    prevs: rawFormData,
    errors: z.flattenError(validated.error).fieldErrors
  }

  if (rawFormData.password !== rawFormData.password_confirmation) return {
    success: false,
    message: "Passwords do not match",
    errors: { password: "Passwords do not match" },
    prevs: rawFormData
  }

  try {
    await api.post('/auth/signup', { ...rawFormData })
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const data = error.response.data as BackEndErrorResponse
      const errors = data.errors.reduce((acc, error) => ({ ...acc, [error.param]: error.message }), {})
      return {
        success: false,
        message: error.response.data.title,
        prevs: rawFormData,
        errors,
      }
    }
  }



  try {
    await signIn("credentials", {
      ...rawFormData,
      redirect: false
    })

    return {
      success: true,
      message: "Account created"
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
    }
    return {
      success: false,
      message: "Error login in, please try again",
      prevs: rawFormData
    }
  }

}

export async function signinAction(_formState: ServerActionState, formData: FormData): Promise<ServerActionState> {

  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validated = signinSchema.safeParse(rawFormData)

  if (validated.error) return {
    success: false,
    errors: z.flattenError(validated.error).fieldErrors,
    message: 'One or more fields are incorrect. Please update them.',
    prevs: { email: rawFormData.email }
  }

  try {
    await signIn("credentials", { ...rawFormData, redirect: false })
    return {
      success: true,
      message: "Signed in successfully."
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Incorrect username or password.",
      prevs: { email: rawFormData.email }
    }
  }

}

export async function signoutAction(): Promise<ServerActionState> {
  await signOut({
    redirect: false
  })

  return {
    success: true,

  }
}