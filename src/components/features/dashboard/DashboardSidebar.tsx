import { AppLogo } from "@/components/AppLogo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BabyIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SidebarLink } from "./SidebarLink";

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
export const DashboardSidebar = () => {
  return (
    <aside className="bg-primary/10 flex h-dvh w-64 flex-col shadow">
      <div className="mb-8 px-2 py-6">
        <Link href={"/admin/dashboard"}>
          <AppLogo />
        </Link>
      </div>
      <div className="grid grow content-start overflow-y-auto">
        {SIDEBAR_LINKS.map((link, i) => (
          <SidebarLink key={i} href={link.href}>
            {link.icon}
            {link.label}
          </SidebarLink>
        ))}
      </div>
    </aside>
  );
};
