import { AppLogo } from "@/components/AppLogo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BabyIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SIDEBAR_LINKS = [
  {
    icon: <LayoutDashboardIcon className="size-5" />,
    label: "dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: <BabyIcon className="size-5" />,
    label: "children",
    href: "/admin/children",
  },
];
export const Sidebar = () => {
  return (
    <aside className="bg-background flex h-dvh w-64 flex-col">
      <div className="mb-8 px-2 py-6">
        <Link href={"/admin/dashboard"}>
          <AppLogo />
        </Link>
      </div>
      <div className="grid grow content-start overflow-y-auto">
        {SIDEBAR_LINKS.map((link, i) => (
          <Link className={cn(buttonVariants({ variant: "ghost" }), "hover:bg-primary/10 h-auto justify-start rounded-none border-none py-3 capitalize shadow-none")} key={i} href={link.href}>
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};
