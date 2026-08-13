import { CONFIG } from "@/lib/config";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { AppLogo } from "./AppLogo";
import { FrontPageUserMenu } from "./FrontPageUserMenu";

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
      <div className="container grid grid-cols-[1fr_auto_1fr] items-center py-4">
        <Link href={"/"}>
          <AppLogo />
        </Link>
        <ul className="hidden items-center gap-4 lg:flex lg:min-w-md lg:justify-between">
          {NAV_LINKS.map((nav_link, index) => (
            <Link className="p-1 font-medium text-gray-600 hover:underline" key={index} href={nav_link.href}>
              {nav_link.label}
            </Link>
          ))}
        </ul>
        <FrontPageUserMenu />
      </div>
    </nav>
  );
};
