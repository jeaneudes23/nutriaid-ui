import { auth } from "@/lib/auth";
import React from "react";

export default async function page() {
  const session = await auth();
  return (
    <div>
      <h2 className="font-heading text-4xl font-bold">Welcome Home!</h2>
      <div className="break-all">{session?.user.token}</div>
    </div>
  );
}
