"use client";

import React from "react";
import { signoutAction } from "../auth-server-action";
import { SubmitButton } from "@/components/SubmitButton";
import { useRouter } from "next/navigation";

export default function SignoutButton({ className }: { className?: string }) {
  const [state, action] = React.useActionState(signoutAction, null);
  const handleRef = React.useRef<typeof state | null>(null);
  const router = useRouter();
  React.useEffect(() => {
    if (handleRef.current === state) return;
    handleRef.current = state;
    router.push("/");
    router.refresh();
  });

  return (
    <form action={action} className={className}>
      <SubmitButton type="submit">Logout</SubmitButton>
    </form>
  );
}
