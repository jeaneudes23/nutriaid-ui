import { CONFIG } from "@/lib/config";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { AppLogo } from "./AppLogo";

const NAV_LINKS = [
  {
    label: "Profiles",
    href: "/",
  },
  {
    label: "Recommendations",
    href: "/",
  },
  {
    label: "Monitoring",
    href: "/",
  },
];
export const Navbar = () => {
  return (
    <nav className="bg-primary/5 border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href={"/"}>
          <AppLogo />
        </Link>
        <ul className="hidden items-center gap-4 lg:flex">
          {NAV_LINKS.map((nav_link, index) => (
            <Link className="p-1 font-medium text-gray-600 hover:underline" key={index} href={nav_link.href}>
              {nav_link.label}
            </Link>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:inline-flex">
          <Link href={"/login"} className={buttonVariants({ variant: "outline" })}>
            Login
          </Link>
          <Link href={"/register"} className={buttonVariants({})}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};
