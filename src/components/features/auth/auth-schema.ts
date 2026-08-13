import z from 'zod'
export interface AuthResponse {
  token: string,
  user: User
}

export interface User {
  fullName: string,
  email: string,
  role: string,
}

export interface LoginDTO {
  email: string,
  password: string
}

export interface CreateUserDTO {
  fullName: string,
  email: string,
  password: string
}

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
})