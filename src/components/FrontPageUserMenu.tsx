"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import LogoutButton from "./features/auth/components/LogoutButton";

export const FrontPageUserMenu = () => {
  const { data, status } = useSession();
  console.log(data);
  if (status !== "authenticated")
    return (
      <div className="hidden items-center justify-end gap-2 md:inline-flex">
        <Link href={"/login"} className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
        <Link href={"/register"} className={buttonVariants({})}>
          Register
        </Link>
      </div>
    );
  return (
    <div className="hidden items-center justify-end gap-2 md:inline-flex">
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};
