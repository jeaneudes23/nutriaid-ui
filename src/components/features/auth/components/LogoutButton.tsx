import React from "react";
import { signoutAction } from "../auth-action";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <form action={signoutAction}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
