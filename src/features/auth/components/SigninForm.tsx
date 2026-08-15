"use client";

import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { signinAction } from "../auth-server-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormFieldError from "@/components/FormFieldError";

export const SigninForm = () => {
  const [state, action] = React.useActionState(signinAction, {});
  const stateRef = React.useRef<typeof state | null>(null);

  const router = useRouter();
  React.useEffect(() => {
    if (stateRef.current === state || !state.message) return;
    stateRef.current = state;

    if (state.success) {
      toast.success(state.message);
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="email">Email address</Label>
          <Input key={state?.prevs?.email} defaultValue={state?.prevs?.email ?? ""} name="email" type="email" id="email" />
          <FormFieldError error={state?.errors?.email} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />
          <FormFieldError error={state?.errors?.password} />
        </div>
      </div>
      <div className="grid">
        <SubmitButton type="submit">Login</SubmitButton>
      </div>
    </form>
  );
};
