"use client"

import { ServerActionState } from '@/types'
import React from 'react'
import toast from 'react-hot-toast'

interface Props {
  state: ServerActionState,
  onSuccess?: () => void
}
export const useToast = ({ state, onSuccess }: Props) => {

  const stateRef = React.useRef<typeof state | null>(null)
  React.useEffect(() => {
    if (stateRef.current === state || !state.message) return

    if (state.success) {
      toast.success(state.message)
      onSuccess?.()
    } else {
      toast.error(state.message)
    }
  }, [state, onSuccess])
  return
}
