export interface ServerActionState {
  success?: boolean,
  message?: string,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevs?: any,

  nextPath?: string,

}

export interface BackEndErrorResponse {
  title: string,
  errors: { message: string, param: string, value: string }[]
}
import { DefaultSession } from "next-auth"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from "next-auth/jwt"


declare module "next-auth" {
  interface Session {
    user: {
      token: string,
    } & DefaultSession['user']
  }

  interface User {
    token: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string,
  }
}

export interface StatForWidget {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  unit?: string;
};