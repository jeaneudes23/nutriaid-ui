import { AppLogo } from "@/components/AppLogo";
import { BabyIcon, LayoutDashboardIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { SidebarLink } from "./SidebarLink";
import { DashboardUserMenu } from "./DashboardUserMenu";

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
  {
    icon: <ThumbsUpIcon className="size-5" />,
    label: "Recommendations",
    href: "/admin/recommendations",
  },
];
export const DashboardSidebar = () => {
  return (
    <aside className="flex h-dvh w-64 flex-col bg-gray-100">
      <div className="mb-8 px-4 py-6">
        <Link href={"/admin/dashboard"}>
          <AppLogo />
        </Link>
      </div>
      <div className="grid grow content-start gap-2 overflow-y-auto px-4">
        {SIDEBAR_LINKS.map((link, i) => (
          <SidebarLink key={i} href={link.href}>
            {link.icon}
            {link.label}
          </SidebarLink>
        ))}
      </div>
      <div className="px-4 py-6">
        <DashboardUserMenu />
      </div>
    </aside>
  );
};
