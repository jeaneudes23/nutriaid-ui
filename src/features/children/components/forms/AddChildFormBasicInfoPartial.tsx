import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ListTodoIcon } from "lucide-react";
import React from "react";
import { AppendAddChildFormDataParams } from "./AddChildForm";
import { ServerActionState } from "@/types";

interface Props {
  isVisible: boolean;
  prevs?: ServerActionState["prevs"];
  errors?: ServerActionState["errors"];
  appendAddChildFormData: ({ key, value }: AppendAddChildFormDataParams) => void;
}

export const AddChildFormBasicInfoPartial = ({ isVisible, prevs, errors, appendAddChildFormData }: Props) => {
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  today.setFullYear(today.getFullYear() - 5);
  const minDate = today.toISOString().split("T")[0];

  return (
    <Card className={cn(!isVisible ? "hidden" : "max-w-3xl")}>
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <ListTodoIcon />
          Child&apos;s Basic Info
        </CardTitle>
        <CardDescription>Provide basic identity details to begin the child&apos;s nutritional measurement assessment.</CardDescription>
      </CardHeader>
      <CardContent className="grid max-w-lg gap-4">
        <div className="grid gap-1">
          <Label htmlFor="displayName">Child name</Label>
          <Input
            key={prevs?.displayName}
            defaultValue={prevs?.displayName ?? ""}
            onChange={(e) => appendAddChildFormData({ key: "displayName", value: e.target.value })}
            name="displayName"
            id="displayName"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input
            key={prevs?.dateOfBirth}
            defaultValue={prevs?.dateOfBirth ?? ""}
            min={minDate}
            max={maxDate}
            onChange={(e) => appendAddChildFormData({ key: "dateOfBirth", value: e.target.value })}
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="sex">Gender</Label>
          <select
            onChange={(e) => appendAddChildFormData({ key: "sex", value: e.target.value })}
            className={cn(
              "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-9 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
            )}
            name="sex"
            id="sex"
            key={prevs?.sex}
            defaultValue={prevs?.sex ?? ""}
          >
            <option disabled value={""} />
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
};
