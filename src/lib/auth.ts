import { login } from "@/features/auth/auth-api"
import { BackEndErrorResponse } from "@/types"
import { AxiosError } from "axios"
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { redirect } from "next/navigation"


class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}


export const { handlers, auth, signOut, signIn } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials.email as string
        const password = credentials.password as string
        const auth = await login({ email, password })

        if (!auth) throw new InvalidLoginError()

        return {
          token: auth.token,
          name: auth.user.fullName,
          email: auth.user.email,
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.token = user.token
      }
      return token
    },

    async session({ session, token }) {
      session.user.token = token.token
      return session
    }
  }
})

export async function handleAxiosErrorOnServer(error: AxiosError): Promise<Record<string, string> | null> {
  "use server"

  if (error.response?.status == 401) {
    await signOut({
      redirect: true,
      redirectTo: '/login'
    })
    return null
  } else {
    const errorData = error.response?.data as BackEndErrorResponse
    const errors = errorData.errors?.reduce((acc, error) => ({ ...acc, [error.param]: error.message }), {})
    return errors
  }

}