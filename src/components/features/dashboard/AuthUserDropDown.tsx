"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const NAME = "Jack Hy";
export const AuthUserDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="text-primary border-primary inline rounded-full border-2 p-2 text-sm font-medium uppercase">{`${NAME.split(" ")[0][0]}${NAME.split(" ")[1] ? NAME.split(" ")[1][0] : ""}`}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"min-w-56"}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className={"grid"}>
          <Button>Logout</Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
