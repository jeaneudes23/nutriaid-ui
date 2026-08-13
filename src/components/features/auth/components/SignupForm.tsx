"use client";

import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupAction } from "../auth-server-action";
import { useActionState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormFielError from "@/components/FormFieldError";

export const SignupForm = () => {
  const [state, action] = useActionState(signupAction, {});
  const router = useRouter();
  const handledRef = useRef<typeof state | null>(null);

  useEffect(() => {
    const { success, message } = state;
    if (!message || handledRef.current === state) return;
    handledRef.current = state;

    if (success) {
      toast.success(message);
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      toast.error(message);
    }
  }, [state, router]);

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="fullName">Full name</Label>
          <Input defaultValue={state?.prevs?.fullName ?? ""} name="fullName" id="fullName" />
          <FormFielError error={state.errors?.fullName} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="email">Email address</Label>
          <Input defaultValue={state?.prevs?.email ?? ""} name="email" type="email" id="email" />
          <FormFielError error={state?.errors?.email} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" />
          <FormFielError error={state?.errors?.password} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password_confirmation">Confirm password</Label>
          <Input type="password" name="password_confirmation" id="password_confirmation" />
        </div>
      </div>
      <div className="grid">
        <SubmitButton type="submit">Create an account</SubmitButton>
      </div>
    </form>
  );
};
