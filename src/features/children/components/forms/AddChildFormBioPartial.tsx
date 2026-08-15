import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleQuestionMarkIcon } from "lucide-react";
import React from "react";
import { CHILD_BIO_QUESTIONS } from "../../child-bio-questions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ServerActionState } from "@/types";

interface Props {
  isVisible: boolean;
  prevs?: ServerActionState["prevs"];
  errors?: ServerActionState["errors"];
}

export const AddChildFormBioPartial = ({ isVisible, prevs, errors }: Props) => {
  return (
    <Card className={cn(!isVisible ? "hidden" : "max-w-3xl")}>
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <MessageCircleQuestionMarkIcon />
          Nutrition Assessment Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {CHILD_BIO_QUESTIONS.map((bioq, i) => (
          <div key={i} className="grid gap-1">
            <Label htmlFor={bioq.key}>{bioq.title}</Label>
            <p className="text-muted-foreground text-sm">{bioq.question}</p>
            <Textarea key={bioq.key} defaultValue={prevs?.[bioq.key] ?? ""} name={bioq.key} id={bioq.key} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
