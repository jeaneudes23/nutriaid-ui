"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface LinkProps extends PropsWithChildren {
  href: string;
}

export const SidebarLink = ({ children, href }: LinkProps) => {
  const currentPath = usePathname();
  const isActive = currentPath.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost" }),
        "lg: h-auto justify-start gap-0 rounded-md border-none py-2 capitalize lg:gap-2",
        isActive ? "text-primary shadow" : "hover:bg-primary/10 shadow-none",
        "",
      )}
    >
      {children}
    </Link>
  );
};
