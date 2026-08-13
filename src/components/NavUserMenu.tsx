import Link from "next/link";
import { buttonVariants } from "./ui/button";
import SignoutButton from "./features/auth/components/SignoutButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LayoutDashboard } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { auth } from "@/lib/auth";

export const NavUserMenu = async () => {
  const session = await auth();
  if (!session)
    return (
      <div className="inline-flex items-center justify-end gap-2">
        <Link href={"/login"} className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
        <Link href={"/register"} className={buttonVariants({})}>
          Register
        </Link>
      </div>
    );
  return (
    <div className="inline-flex items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={session.user.name!} />
        </DropdownMenuTrigger>
        <DropdownMenuSeparator />
        <DropdownMenuContent className={"min-w-56"}>
          <DropdownMenuGroup className={"grid"}>
            <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
            <Link className={buttonVariants({ variant: "ghost", className: "justify-start" })} href={"/admin/dashboard"}>
              <LayoutDashboard /> Dashboard
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <SignoutButton className="grid" />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
