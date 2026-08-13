import { ServerActionState } from "@/types"
import * as React from "react"
import toast from 'react-hot-toast'

interface Props {
  state: ServerActionState,
  onSuccess?: () => void,
}

export default function useActionToast({ state, onSuccess }: Props) {

  const { success, message, toastId: id } = state
  React.useEffect(() => {

    if (!message) return

    if (success) {
      toast.success(message, { id, className: 'text-sm' })
      onSuccess?.()
    } else {
      toast.error(message, { id: "error-id", className: 'text-sm' })
    }

  }, [message, success, id, onSuccess])
}
