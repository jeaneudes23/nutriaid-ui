"use client";

import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "@base-ui/react/button";

export const SubmitButton = ({ disabled, children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  const isLoading = disabled || pending;

  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <Loader2 strokeWidth={3} className="size-5 animate-spin self-center" /> : ""}
      {children}
    </Button>
  );
};
