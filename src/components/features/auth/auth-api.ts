import { AxiosError } from "axios"
import { AuthResponse, CreateUserDTO, LoginDTO } from "./auth-schema"
import { api } from "@/lib/api"

export async function login(user: LoginDTO): Promise<AuthResponse | null> {
  try {
    const res = await api.post('/auth/login', { ...user })
    const { data } = res.data
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data)
    }
    return null
  }
}

export async function registerCareGiver(user: CreateUserDTO): Promise<AuthResponse | null> {
  try {
    const res = await api.post('/auth/signup', { ...user })
    return res.data
  } catch (error) {
    console.error(error)
    return null
  }
}