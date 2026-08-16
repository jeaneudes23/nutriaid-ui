"use client";

import React from "react";
import { FoodRecommendation } from "../assessment-schema";
import { ChefHat, ChevronDownIcon, ShoppingBasketIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  meal: FoodRecommendation;
}

export const MealRecommendation = ({ meal }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="grid overflow-hidden rounded-md border">
      <button onClick={() => setOpen((prev) => !prev)} className="flex w-full cursor-pointer items-center border-b p-0 transition-colors hover:bg-gray-50">
        <span className="bg-primary text-primary-foreground px-6 py-4 text-lg font-bold">{meal.priority}</span>
        <div className="px-3">
          <h3 className="pb-0 text-lg font-semibold">{meal.name}</h3>
        </div>
        <div className={cn("ml-auto px-3 transition-transform", open ? "rotate-90" : "")}>
          <ChevronDownIcon />
        </div>
      </button>
      <div className={cn(open ? "grid gap-6 p-6" : "hidden")}>
        <div className="border-primary bg-primary/5 rounded border-l-4 px-4 py-2">{meal.why}</div>
        <div className="grid gap-2">
          <h3 className="inline-flex items-center gap-2 font-medium">
            <ShoppingBasketIcon />
            Ingredients
          </h3>
          <div className="flex items-center gap-1">
            {meal.ingredients.map((ingredient, i) => (
              <Badge key={i} variant={"outline"} className="text-primary">
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="inline-flex items-center gap-2 font-medium">
            <ChefHat />
            Instructions
          </h3>
          <div className="grid gap-2">
            {meal.howToPrepare.split(", ").map((step, i) => (
              <div key={i} className="inline-flex items-center gap-2">
                <span className="bg-primary/5 text-primary grid size-6 place-content-center rounded-full border">{i + 1}</span>
                <span>{step.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
