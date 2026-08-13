import axios from 'axios'
import { getSession } from 'next-auth/react'
import { auth } from './auth'

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`,
  headers: {
    Accept: 'application/json'
  }
})

const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}`,
  headers: {
    Accept: 'application/json',
  }
})

authApi.interceptors.request.use(
  async (config) => {
    let token: string | undefined
    if (typeof window === 'undefined') {
      const session = await auth()
      token = session?.user?.token
    } else {
      const session = await getSession()
      token = session?.user?.token
    }

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  }
)
export { api, authApi }