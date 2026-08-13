import React from "react";

export default function FormFieldError({ error }: { error: string | string[] | null | undefined }) {
  if (!error) return null;
  if (typeof error == "string") {
    return <p className="text-xs font-medium text-red-600">{error}</p>;
  }
  if (Array.isArray(error)) return <p className="text-xs font-medium text-red-600">{error?.map((err) => err).join(", ")}</p>;
  return null;
}
