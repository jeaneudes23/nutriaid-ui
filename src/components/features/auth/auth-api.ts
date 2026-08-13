import { AxiosError } from "axios"
import { AuthResponse, signinCredentials } from "./auth-schema"
import { api } from "@/lib/api"

export async function login(credentials: signinCredentials): Promise<AuthResponse | null> {
  try {
    const res = await api.post('/auth/login', { ...credentials })
    const { data } = res.data
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data)
    }
    return null
  }
}
