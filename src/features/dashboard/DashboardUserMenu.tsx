import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/UserAvatar";
import { auth } from "@/lib/auth";
import SignoutButton from "../auth/components/SignoutButton";

export const DashboardUserMenu = async () => {
  const session = await auth();

  if (!session?.user.name) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"flex w-full items-center gap-2 rounded-md border bg-white p-2 shadow"}>
        <UserAvatar name={session.user.name} />
        <p className="text-sm font-medium">{session.user.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"min-w-56"}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className={"grid"}>
          <SignoutButton className="grid" />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
