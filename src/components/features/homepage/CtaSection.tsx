import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const CtaSection = () => {
  return (
    <section className="border-y py-16 lg:py-24">
      <div className="container text-center">
        <h2 className="font-primary font-heading text-2xl font-bold lg:text-4xl">Start providing optimal nutrition today.</h2>
        <p className="my-6 text-gray-600">Join thousands of caregivers utilizing our local-first tools for early childhood development.</p>
        <Link href={"/register"} className={cn(buttonVariants(), "font-heading font-semibold lg:h-auto lg:px-8 lg:py-2 lg:text-lg")}>
          Create Child Profile
        </Link>
      </div>
    </section>
  );
};
