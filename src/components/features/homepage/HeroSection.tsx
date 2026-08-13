import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const HeroSection = () => {
  return (
    <section className="container py-16 lg:py-24">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-4 py-2">
          <CheckCircle2Icon />
          <span className="font-primary text-sm font-bold">Evidence-Based Pediatrics</span>
        </span>
        <h1 className="font-heading max-w-2xl text-3xl font-bold lg:text-5xl">Evidence-based nutrition for your child&apos;s first 5 years.</h1>
        <p className="max-w-3xl tracking-wide text-gray-600 lg:text-lg">
          Clear, evidence-based meal plans and growth tracking tools designed to give parents peace of mind, with all data stored securely on your device for this demo.{" "}
        </p>
        <div className="flex items-center gap-4">
          <Link href={"/register"} className={cn(buttonVariants(), "font-heading font-semibold lg:h-auto lg:px-6 lg:py-3 lg:text-lg")}>
            Get Started
          </Link>
          <Link href={"/register"} className={cn(buttonVariants({ variant: "outline" }), "font-heading font-semibold lg:h-auto lg:px-6 lg:py-3 lg:text-lg")}>
            View Local Data
          </Link>
        </div>
      </div>
    </section>
  );
};
