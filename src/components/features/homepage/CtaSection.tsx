import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const CtaSection = () => {
  return (
    <section className="border-y py-16 lg:py-24">
      <div className="container text-center">
        <h2 className="font-primary font-heading text-4xl font-bold">Start providing optimal nutrition today.</h2>
        <p className="my-6 text-gray-600">Join thousands of caregivers utilizing our local-first tools for early childhood development.</p>
        <Link href={"/register"} className={cn(buttonVariants(), "font-heading h-auto px-8 py-2 text-lg font-semibold")}>
          Create Child Profile
        </Link>
      </div>
    </section>
  );
};
