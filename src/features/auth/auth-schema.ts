import z from 'zod'

export interface signinCredentials {
  email: string,
  password: string
}
export interface User {
  fullName: string,
  email: string,
  role: string,
}
export interface AuthResponse {
  token: string,
  user: User
}


export const signinSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required")
})

export const signupSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email address is required"),
  password: z.string().min(1, "Password is required")
})