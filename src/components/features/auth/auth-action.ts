"use server"

import { signIn, signOut } from "@/lib/auth";
import { login, registerCareGiver } from "./auth-api";

export async function registerAction(formData: FormData) {
  const rawFormData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  await registerCareGiver(rawFormData)

  await signIn("credentials", {
    ...rawFormData,
    redirect: true,
    redirectTo: '/admin/dashboard'
  })

}

export async function signinAction(formData: FormData) {

  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  await signIn("credentials", {
    ...rawFormData,
    redirect: true,
    redirectTo: '/admin/dashboard'
  })

}

export async function signoutAction() {
  await signOut({
    redirect: true,
    redirectTo: '/'
  })
}