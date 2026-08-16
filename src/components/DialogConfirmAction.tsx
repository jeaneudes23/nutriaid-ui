"use client";

import * as React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { SubmitButton } from "./SubmitButton";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import { performAction } from "@/actions/actions";
import { useToast } from "@/hooks/useToast";

interface Props {
  triggerChildren: React.ReactNode;
  cardTitle: React.ReactNode;
  cardDescription: React.ReactNode;
  method: "post" | "delete" | "patch";
  apiUrl: string;
}
export default function DialogConfirmAction({ triggerChildren, cardDescription, cardTitle, method, apiUrl }: Props) {
  const [state, action] = React.useActionState(performAction, {});
  const [open, setOpen] = React.useState<boolean>(false);
  const { refresh } = useRouter();

  const onSuccess = React.useCallback(() => {
    setOpen(false);
    refresh();
  }, [setOpen, refresh]);

  useToast({ state, onSuccess });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger suppressHydrationWarning>{triggerChildren}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cardTitle}</DialogTitle>
          <DialogDescription>{cardDescription}</DialogDescription>
        </DialogHeader>
        <form action={action} className="flex items-center gap-2">
          <input type="hidden" name="method" value={method} readOnly />
          <input type="hidden" name="apiUrl" value={apiUrl} readOnly />
          <DialogClose className={buttonVariants({ variant: "secondary" })}>Cancel</DialogClose>
          <SubmitButton type="submit">Confirm</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
