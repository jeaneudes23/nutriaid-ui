import { login } from "@/components/features/auth/auth-api"
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"


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
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.token = user.token
      }

      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }


      return token
    },

    async session({ session, token }) {
      session.user.token = token.token
      return session
    }
  }
})