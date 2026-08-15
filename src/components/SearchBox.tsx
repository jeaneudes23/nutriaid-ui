import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const SearchBox = () => {
  return (
    <form>
      <Label htmlFor="search" hidden>
        Search
      </Label>
      <Input type="search" placeholder="Search" className="rounded-full" name="search" id="search" />
    </form>
  );
};
