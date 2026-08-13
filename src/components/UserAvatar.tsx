import React from "react";

export const UserAvatar = ({ name }: { name: string }) => {
  return (
    <div className="text-primary border-primary inline rounded-full border-2 p-2 text-sm font-medium uppercase">{`${name.split(" ")[0][0]}${name.split(" ")[1] ? name.split(" ")[1][0] : ""}`}</div>
  );
};
